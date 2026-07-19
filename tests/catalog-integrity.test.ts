import test from 'node:test'
import assert from 'node:assert/strict'

import { compareCatalogSnapshots } from '../scripts/verify-catalog-integrity.mjs'
import { createCatalogSnapshot } from '../scripts/verify-catalog-integrity.mjs'
import { createIfMissing, runSeedCli } from '../scripts/seed-preservation.mjs'
import { createConsistentCatalogBackup } from '../scripts/consistent-sqlite-backup.mjs'
import { archiveProduct } from '../pages/api/admin/products/[id]'
import { archivePart } from '../pages/api/admin/parts/[id]'

test('不允许产品、配件和分类记录减少', () => {
  const before = { counts: { categories: 6, subcategories: 12, products: 60, parts: 60 } }
  const after = { counts: { categories: 6, subcategories: 12, products: 59, parts: 60 } }

  assert.throws(() => compareCatalogSnapshots(before, after), /products.*减少/)
})

test('不允许已有产品或配件 ID 消失', () => {
  const before = {
    counts: { categories: 1, subcategories: 1, products: 2, parts: 1 },
    ids: { categories: ['heavy-truck'], subcategories: ['heavy-truck:dump-truck'], products: ['a', 'b'], parts: ['p1'] },
  }
  const after = {
    counts: { categories: 1, subcategories: 1, products: 2, parts: 1 },
    ids: { categories: ['heavy-truck'], subcategories: ['heavy-truck:dump-truck'], products: ['a', 'c'], parts: ['p1'] },
  }

  assert.throws(() => compareCatalogSnapshots(before, after), /products.*b.*缺失/)
})

test('不允许已有产品图片或规格摘要变化', () => {
  const before = {
    counts: { categories: 1, subcategories: 1, products: 1, parts: 0 },
    ids: { categories: ['heavy-truck'], subcategories: ['heavy-truck:dump-truck'], products: ['a'], parts: [] },
    protectedFields: { products: { a: { image: '/old.webp', specificationsSha256: 'abc' } }, parts: {} },
  }
  const after = {
    counts: { categories: 1, subcategories: 1, products: 1, parts: 0 },
    ids: { categories: ['heavy-truck'], subcategories: ['heavy-truck:dump-truck'], products: ['a'], parts: [] },
    protectedFields: { products: { a: { image: '/new.webp', specificationsSha256: 'abc' } }, parts: {} },
  }

  assert.throws(() => compareCatalogSnapshots(before, after), /products.*a.*image.*变化/)
})

test('删除产品时仅归档并保留原记录', async () => {
  const calls: unknown[] = []
  const client = { product: { update: async (args: unknown) => { calls.push(args); return { id: 'truck-1' } } } }

  const result = await archiveProduct(client, 'truck-1')

  assert.deepEqual(calls, [{ where: { id: 'truck-1' }, data: { isActive: false } }])
  assert.deepEqual(result, { id: 'truck-1' })
})

test('删除配件时仅归档并保留原记录', async () => {
  const calls: unknown[] = []
  const client = { part: { update: async (args: unknown) => { calls.push(args); return { id: 'part-1' } } } }

  const result = await archivePart(client, 'part-1')

  assert.deepEqual(calls, [{ where: { id: 'part-1' }, data: { isActive: false } }])
  assert.deepEqual(result, { id: 'part-1' })
})

test('快照保护分类、子分类关系和配件分类', async () => {
  const prisma = {
    category: { findMany: async () => [{ id: 'heavy', name: 'Heavy', description: 'd', tagline: 't', fullDesc: 'f', bannerImage: '/b', image: '/i', icon: 'x', sortOrder: 1 }] },
    subcategory: { findMany: async () => [{ id: 'heavy:dump', categoryId: 'heavy', name: 'Dump', image: '/s', sortOrder: 2 }] },
    product: { findMany: async () => [] },
    part: { findMany: async () => [{ id: 'part-1', image: '/p', specifications: '{}', category: 'engine' }] },
  }

  const snapshot = await createCatalogSnapshot(prisma)

  assert.equal(snapshot.protectedFields.categories.heavy.name, 'Heavy')
  assert.equal(snapshot.protectedFields.subcategories['heavy:dump'].categoryId, 'heavy')
  assert.equal(snapshot.protectedFields.parts['part-1'].category, 'engine')
})

test('校验器拒绝子分类关系或配件分类变化', () => {
  const base = {
    counts: { categories: 1, subcategories: 1, products: 0, parts: 1 },
    ids: { categories: ['heavy'], subcategories: ['heavy:dump'], products: [], parts: ['part-1'] },
    protectedFields: {
      categories: { heavy: { name: 'Heavy' } },
      subcategories: { 'heavy:dump': { categoryId: 'heavy' } },
      products: {},
      parts: { 'part-1': { category: 'engine' } },
    },
  }
  const changed = structuredClone(base)
  changed.protectedFields.subcategories['heavy:dump'].categoryId = 'light'

  assert.throws(() => compareCatalogSnapshots(base, changed), /subcategories.*heavy:dump.*categoryId.*变化/)
})

test('seed 使用原子 upsert 且 update 为空，绝不覆盖已有数据', async () => {
  const calls: unknown[] = []
  const model = {
    upsert: async (args: unknown) => { calls.push(args); return { id: 'existing', isActive: false } },
  }
  const create = { id: 'existing', image: '/seed.webp', specifications: '{}', isActive: true }

  const result = await createIfMissing(model, { id: 'existing' }, create)

  assert.deepEqual(calls, [{ where: { id: 'existing' }, update: {}, create }])
  assert.deepEqual(result, { id: 'existing', isActive: false })
})

test('seed 任一步失败时返回非零退出码并断开数据库', async () => {
  const events: string[] = []
  const exitCode = await runSeedCli(
    async () => { throw new Error('seed failed') },
    async () => { events.push('disconnect') },
    (message) => { events.push(message) },
  )

  assert.equal(exitCode, 1)
  assert.deepEqual(events, ['ERROR: Error: seed failed\n', 'disconnect'])
})

test('一致性备份先完成 SQLite 在线备份，再从副本生成清单', async () => {
  const calls: string[] = []
  const snapshot = await createConsistentCatalogBackup({
    sourceUrl: 'file:admin.db',
    destinationPath: 'backups/catalog/copy.db',
    vacuumInto: async (source, destination) => { calls.push(`vacuum:${source}:${destination}`) },
    snapshotFromDatabase: async (databaseUrl: string) => { calls.push(`snapshot:${databaseUrl}`); return { counts: { products: 60 } } },
  })

  assert.deepEqual(calls, [
    'vacuum:file:admin.db:backups/catalog/copy.db',
    'snapshot:file:backups/catalog/copy.db',
  ])
  assert.deepEqual(snapshot, { counts: { products: 60 } })
})
