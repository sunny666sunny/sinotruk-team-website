import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const CATALOG_KEYS = ['categories', 'subcategories', 'products', 'parts']

function sha256(value) {
  return createHash('sha256').update(value ?? '').digest('hex')
}

function parseImageList(value) {
  try {
    const parsed = JSON.parse(value || '[]')
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function createPrismaClient(databaseUrl = process.env.DATABASE_URL || 'file:./admin.db') {
  return new PrismaClient({ adapter: new PrismaLibSql({ url: databaseUrl }) })
}

export async function createCatalogSnapshot(prisma) {
  const [categories, subcategories, products, parts] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, name: true, description: true, tagline: true, fullDesc: true, bannerImage: true, image: true, icon: true, sortOrder: true },
      orderBy: { id: 'asc' },
    }),
    prisma.subcategory.findMany({
      select: { id: true, categoryId: true, name: true, image: true, sortOrder: true },
      orderBy: { id: 'asc' },
    }),
    prisma.product.findMany({
      select: { id: true, categoryId: true, subcategoryId: true, image: true, bannerImage: true, galleryImages: true, specifications: true },
      orderBy: { id: 'asc' },
    }),
    prisma.part.findMany({
      select: { id: true, category: true, image: true, specifications: true },
      orderBy: { id: 'asc' },
    }),
  ])

  return {
    createdAt: new Date().toISOString(),
    counts: {
      categories: categories.length,
      subcategories: subcategories.length,
      products: products.length,
      parts: parts.length,
    },
    ids: {
      categories: categories.map(({ id }) => id),
      subcategories: subcategories.map(({ id }) => id),
      products: products.map(({ id }) => id),
      parts: parts.map(({ id }) => id),
    },
    protectedFields: {
      categories: Object.fromEntries(categories.map(({ id, ...fields }) => [id, fields])),
      subcategories: Object.fromEntries(subcategories.map(({ id, ...fields }) => [id, fields])),
      products: Object.fromEntries(products.map((product) => [product.id, {
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        image: product.image,
        bannerImage: product.bannerImage,
        galleryImages: parseImageList(product.galleryImages),
        specificationsSha256: sha256(product.specifications),
      }])),
      parts: Object.fromEntries(parts.map((part) => [part.id, {
        category: part.category,
        image: part.image,
        specificationsSha256: sha256(part.specifications),
      }])),
    },
  }
}

export function compareCatalogSnapshots(before, after) {
  const beforeCounts = before.counts ?? before
  const afterCounts = after.counts ?? after

  for (const key of CATALOG_KEYS) {
    if ((afterCounts[key] ?? 0) < (beforeCounts[key] ?? 0)) {
      throw new Error(`${key} 记录减少：${beforeCounts[key]} -> ${afterCounts[key]}`)
    }
  }

  for (const key of CATALOG_KEYS) {
    for (const id of before.ids?.[key] ?? []) {
      if (!(after.ids?.[key] ?? []).includes(id)) {
        throw new Error(`${key} 记录 ${id} 缺失`)
      }
    }
  }

  for (const group of ['categories', 'subcategories', 'products', 'parts']) {
    for (const [id, protectedValues] of Object.entries(before.protectedFields?.[group] ?? {})) {
      const currentValues = after.protectedFields?.[group]?.[id]
      if (!currentValues) throw new Error(`${group} 记录 ${id} 缺失受保护字段`)
      for (const [field, value] of Object.entries(protectedValues)) {
        if (JSON.stringify(currentValues[field]) !== JSON.stringify(value)) {
          throw new Error(`${group} 记录 ${id} 的 ${field} 发生变化`)
        }
      }
    }
  }

  return true
}

async function main() {
  const baselinePath = path.resolve(process.cwd(), 'backups/catalog/catalog-snapshot.json')
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'))
  const prisma = createPrismaClient()
  try {
    const current = await createCatalogSnapshot(prisma)
    compareCatalogSnapshots(baseline, current)
    process.stdout.write(`Catalog integrity verified: ${current.counts.products} products, ${current.counts.parts} parts.\n`)
  } finally {
    await prisma.$disconnect()
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Catalog integrity check failed: ${error.message}\n`)
    process.exitCode = 1
  })
}
