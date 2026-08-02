import { prisma } from '@/lib/db'
import { synchronizeReviewedCatalog } from '@/lib/product-data/reviewed-catalog-sync'
import { createCatalogBackup } from './backup-database.mjs'

const REVIEW_SOURCE = 'https://sinotruk.international/products/'

async function main() {
  const beforeCount = await prisma.product.count()
  const reviewedAt = new Date().toISOString()
  const result = await synchronizeReviewedCatalog({
    readProducts: () => prisma.product.findMany({
      include: { performanceItems: { orderBy: { sortOrder: 'asc' } } },
    }),
    createBackup: () => createCatalogBackup(),
    commit: async (updates) => {
      await prisma.$transaction(async (transaction) => {
        for (const update of updates) {
          await transaction.product.update({
            where: { id: update.id },
            data: {
              ...update.data,
              performanceItems: {
                deleteMany: {},
                create: update.performanceItems.map((item, sortOrder) => ({ ...item, sortOrder })),
              },
            },
          })
        }
        const settings = {
          catalog_reviewed_at: reviewedAt,
          catalog_review_source: REVIEW_SOURCE,
          catalog_reviewed_product_count: String(updates.length),
        }
        for (const [key, value] of Object.entries(settings)) {
          await transaction.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
        }
      }, { timeout: 60_000 })
    },
  })

  const afterCount = await prisma.product.count()
  if (afterCount !== beforeCount) {
    throw new Error(`同步前后产品总数发生变化：${beforeCount} -> ${afterCount}`)
  }
  const reviewedBaseline = await createCatalogBackup()
  await prisma.setting.upsert({
    where: { key: 'catalog_review_backup' },
    create: { key: 'catalog_review_backup', value: result.databaseCopy },
    update: { value: result.databaseCopy },
  })
  process.stdout.write(`已同步审核产品：${result.reviewedProducts} 款\n`)
  process.stdout.write(`产品总数保持不变：${afterCount} 款\n`)
  process.stdout.write(`旧数据库快照：${result.databaseCopy}\n`)
  process.stdout.write(`审核后基线备份：${reviewedBaseline.databaseCopy}\n`)
}

main()
  .catch((error) => {
    process.stderr.write(`审核产品同步失败：${error instanceof Error ? error.message : String(error)}\n`)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
