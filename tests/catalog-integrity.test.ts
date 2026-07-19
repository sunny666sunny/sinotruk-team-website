import test from 'node:test'
import assert from 'node:assert/strict'

import { compareCatalogSnapshots } from '../scripts/verify-catalog-integrity.mjs'
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
