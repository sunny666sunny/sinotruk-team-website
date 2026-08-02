import { prisma } from '@/lib/db'
import { synchronizeReviewedNews } from '@/lib/content/reviewed-news-sync'
import { createCatalogBackup } from './backup-database.mjs'

async function main() {
  const reviewedAt = new Date().toISOString()
  const result = await synchronizeReviewedNews({
    createBackup: () => createCatalogBackup(),
    commit: async (rows, removedSlugs) => {
      await prisma.$transaction(async (transaction) => {
        for (const row of rows) {
          await transaction.news.upsert({
            where: { slug: row.slug },
            create: row,
            update: row,
          })
        }
        await transaction.news.deleteMany({ where: { slug: { in: removedSlugs } } })
        for (const [key, value] of Object.entries({
          news_editorial_reviewed_at: reviewedAt,
          news_editorial_count: String(rows.length),
        })) {
          await transaction.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
        }
      }, { timeout: 60_000 })
    },
  })

  const [newsCount, productCount, partCount] = await Promise.all([
    prisma.news.count({ where: { isPublished: true } }),
    prisma.product.count(),
    prisma.part.count(),
  ])
  if (newsCount !== 14 || productCount !== 60 || partCount !== 60) {
    throw new Error(`同步后数量异常：news=${newsCount}, products=${productCount}, parts=${partCount}`)
  }
  await prisma.setting.upsert({
    where: { key: 'news_editorial_backup' },
    create: { key: 'news_editorial_backup', value: result.databaseCopy },
    update: { value: result.databaseCopy },
  })
  process.stdout.write(`已同步审核新闻：${result.reviewedNews} 篇\n`)
  process.stdout.write(`已删除重复旧新闻：${result.removedNews} 篇\n`)
  process.stdout.write(`数据库备份：${result.databaseCopy}\n`)
  process.stdout.write(`目录数量：news=${newsCount}, products=${productCount}, parts=${partCount}\n`)
}

main().catch((error) => {
  process.stderr.write(`新闻同步失败：${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
}).finally(() => prisma.$disconnect())
