import assert from 'node:assert/strict'
import test from 'node:test'

import { createProductHandler } from '../pages/api/admin/products/[id]'
import { generateProductDetailContent } from '../lib/product-detail/generate'
import { allProducts } from '../data/products'

function response() {
  return { statusCode: 0, payload: undefined as any, revalidate: async () => undefined, status(code: number) { this.statusCode = code; return this }, json(payload: unknown) { this.payload = payload; return this } }
}

const source = allProducts.find((item) => item.id === 'howo-6x4-cargo-truck')!
const record = {
  id: source.id, name: source.name, description: source.description, categoryId: source.category,
  subcategoryId: `${source.category}:${source.subcategory}`, image: source.image, bannerImage: source.bannerImage || null,
  specifications: JSON.stringify(source.specifications), features: JSON.stringify(source.features || []), detailedFeatures: JSON.stringify(source.detailedFeatures || {}),
  galleryImages: JSON.stringify(source.galleryImages || []), detailContent: '{}', normalizedSpecs: '{}', applicationTags: '[]', marketTags: '[]',
  performanceItems: source.performanceItems || [], category: { id: source.category }, subcategory: { id: source.subcategory }, isActive: true, sortOrder: 0,
}

test('后台 GET 返回规范化详情内容', async () => {
  const handler = createProductHandler({ getAdminSession: () => ({ id: 'admin' }) as any, prisma: { product: { findUnique: async () => record } } as any })
  const res = response()
  await handler({ method: 'GET', query: { id: source.id } } as any, res as any)

  assert.equal(res.statusCode, 200)
  assert.equal(res.payload.detailContent.faqs.length, 5)
  assert.match(res.payload.detailContent.performanceSummary, /Howo 6X4 Cargo Truck/)
})

test('后台 PUT 拒绝少于 4 个 FAQ', async () => {
  let updated = false
  const handler = createProductHandler({
    getAdminSession: () => ({ id: 'admin' }) as any,
    prisma: { product: { findUnique: async () => ({ categoryId: source.category, subcategoryId: `${source.category}:${source.subcategory}` }), update: async () => { updated = true; return record } }, performanceItem: { deleteMany: async () => undefined } } as any,
    afterContentMutation: async () => undefined as never,
  })
  const res = response()
  await handler({ method: 'PUT', query: { id: source.id }, body: { detailContent: { ...generateProductDetailContent(source), faqs: [{ question: 'Only?', answer: 'One.' }] } } } as any, res as any)

  assert.equal(res.statusCode, 400)
  assert.equal(updated, false)
  assert.match(res.payload.error, /4–6/)
})

test('后台 PUT 将合法详情内容序列化保存', async () => {
  let saved: any
  const content = generateProductDetailContent(source)
  const handler = createProductHandler({
    getAdminSession: () => ({ id: 'admin' }) as any,
    prisma: { product: { findUnique: async () => ({ categoryId: source.category, subcategoryId: `${source.category}:${source.subcategory}` }), update: async ({ data }: any) => { saved = data; return record } }, performanceItem: { deleteMany: async () => undefined } } as any,
    afterContentMutation: async () => undefined as never,
  })
  const res = response()
  await handler({ method: 'PUT', query: { id: source.id }, body: { detailContent: content } } as any, res as any)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(JSON.parse(saved.detailContent).faqs, content.faqs)
})

test('后台修改规格时同时落库统一比较字段', async () => {
  let saved: any
  const handler = createProductHandler({
    getAdminSession: () => ({ id: 'admin' }) as any,
    prisma: { product: { findUnique: async () => ({ categoryId: source.category, subcategoryId: `${source.category}:${source.subcategory}` }), update: async ({ data }: any) => { saved = data; return record } } } as any,
    afterContentMutation: async () => undefined as never,
  })
  const res = response()
  await handler({
    method: 'PUT',
    query: { id: source.id },
    body: { specifications: { 'Drive Type': '6×4', Power: '380 HP' } },
  } as any, res as any)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(JSON.parse(saved.normalizedSpecs), {
    'Drive type': '6×4',
    'Engine power': '380 HP',
    drive: '6×4',
    power: '380 HP',
  })
})
