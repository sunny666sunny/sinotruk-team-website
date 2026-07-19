import assert from 'node:assert/strict'
import test from 'node:test'

import { parseJsonField, toPartDto, toProductDto } from '../lib/content/serializers'
import { productPublicPath } from '../lib/content/mutation-effects'

test('parseJsonField returns typed data and falls back for malformed JSON', () => {
  assert.deepEqual(parseJsonField<Record<string, string>>('{"Engine":"371 HP"}', {}), { Engine: '371 HP' })
  assert.deepEqual(parseJsonField<string[]>('not-json', []), [])
})

test('product mutation paths use public route category and subcategory slugs', () => {
  assert.equal(productPublicPath('new-energy', 'new-energy:new-energy', 'electric-truck'), '/products/new-energy-vehicle/new-energy/electric-truck')
})

test('toProductDto converts database JSON fields and route category IDs', () => {
  const dto = toProductDto({
    id: 'electric-truck', name: 'Electric Truck', description: 'Zero-emission truck',
    categoryId: 'new-energy', subcategoryId: 'new-energy', image: '/truck.webp', bannerImage: null,
    specifications: '{"Range":"300 km"}', features: '["Quiet"]',
    detailedFeatures: '{}', galleryImages: '[]', performanceItems: [],
  })

  assert.equal(dto.category, 'new-energy-vehicle')
  assert.deepEqual(dto.specifications, { Range: '300 km' })
  assert.deepEqual(dto.features, ['Quiet'])
})

test('toProductDto safely falls back for missing and malformed procurement JSON', () => {
  const dto = toProductDto({
    id: 'legacy-truck', name: 'Legacy Truck', description: 'Existing catalog record',
    categoryId: 'heavy-truck', subcategoryId: 'dump-truck', image: '/truck.webp', bannerImage: null,
    specifications: '{}', features: '[]', detailedFeatures: '{}', galleryImages: '[]',
    normalizedSpecs: 'not-json', applicationTags: undefined, marketTags: null,
    performanceItems: [],
  })

  assert.deepEqual(dto.normalizedSpecs, {})
  assert.deepEqual(dto.applicationTags, [])
  assert.deepEqual(dto.marketTags, [])
})

test('toPartDto safely falls back for legacy compatible-model data', () => {
  const dto = toPartDto({
    id: 'part-engine-filter', name: 'Engine filter', partNumber: 'WG-1', category: 'engine',
    description: 'Existing part', image: '/part.webp', specifications: '{}', compatibleModels: 'not-json',
  })

  assert.equal(dto.id, 'engine-filter')
  assert.deepEqual(dto.compatibleModels, [])
})
