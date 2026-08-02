import assert from 'node:assert/strict'
import test from 'node:test'

import { allProducts } from '../data/products'
import { generateProductDetailContent, normalizeProductDetailContent } from '../lib/product-detail/generate'
import { toProductDto } from '../lib/content/serializers'
import { preparePublishedProduct } from '../lib/product-data/published-product'

const forbiddenClaims = /(?:\b24\s*\/\s*7\b|warranty|guaranteed delivery|in stock|fuel savings?|reduce(?:s|d)? costs? by|financing|aggregateRating|five-star)/i

test('60 个产品都生成完整且安全的独立详情内容', () => {
  assert.equal(allProducts.length, 60)

  const faqSignatures = new Set<string>()
  const performanceSummaries = new Set<string>()

  for (const product of allProducts) {
    const content = generateProductDetailContent(product)

    assert.equal(content.faqs.length, 5, `${product.id} FAQ 数量`)
    assert.ok(content.performanceItems.length >= 3, `${product.id} Performance 数量`)
    assert.ok(content.gallery.length >= 1, `${product.id} Gallery 数量`)
    assert.ok(content.applicationAreas.length >= 2 && content.applicationAreas.length <= 4, `${product.id} Application 数量`)
    assert.ok(content.solutions.length >= 2 && content.solutions.length <= 4, `${product.id} Solution 数量`)
    assert.ok(content.gallery.every((item) => item.alt.includes(product.name) && item.description.includes(product.name)), `${product.id} Gallery 描述`)
    assert.ok(content.faqs.filter((item) => `${item.question} ${item.answer}`.includes(product.name)).length >= 3, `${product.id} FAQ 产品事实`)
    assert.doesNotMatch(JSON.stringify(content), forbiddenClaims, `${product.id} 禁止承诺`)

    faqSignatures.add(JSON.stringify(content.faqs))
    performanceSummaries.add(content.performanceSummary)
  }

  const distinctProductNames = new Set(allProducts.map((product) => product.name)).size
  assert.equal(faqSignatures.size, distinctProductNames)
  assert.equal(performanceSummaries.size, distinctProductNames)
})

test('产品详情画廊保留产品图但排除 Banner 图', () => {
  const product = allProducts.find((item) => item.id === 'howo-6x4-cargo-truck')!
  assert.ok(product.bannerImage)

  const content = generateProductDetailContent(product)
  const galleryImages = content.gallery.map((item) => item.image)

  assert.ok(galleryImages.includes(product.image))
  assert.ok(!galleryImages.includes(product.bannerImage))
})

test('人工详情内容优先，缺失字段由安全默认值补齐', () => {
  const product = allProducts.find((item) => item.id === 'howo-6x4-cargo-truck')!
  const normalized = normalizeProductDetailContent({
    performanceSummary: 'Reviewed HOWO 6X4 cargo configuration summary.',
    faqs: [
      { question: 'Q1?', answer: 'A1.' },
      { question: 'Q2?', answer: 'A2.' },
      { question: 'Q3?', answer: 'A3.' },
      { question: 'Q4?', answer: 'A4.' },
    ],
  }, product)

  assert.equal(normalized.performanceSummary, 'Reviewed HOWO 6X4 cargo configuration summary.')
  assert.equal(normalized.faqs.length, 4)
  assert.ok(normalized.gallery.length >= 1)
  assert.ok(normalized.solutions.length >= 2)
})

test('少于 4 个或多于 6 个 FAQ 的人工内容会回退到默认 FAQ', () => {
  const product = allProducts[0]
  const tooFew = normalizeProductDetailContent({ faqs: [{ question: 'Only?', answer: 'One.' }] }, product)
  const tooMany = normalizeProductDetailContent({ faqs: Array.from({ length: 7 }, (_, index) => ({ question: `Q${index}?`, answer: `A${index}.` })) }, product)

  assert.equal(tooFew.faqs.length, 5)
  assert.equal(tooMany.faqs.length, 5)
})

test('数据库 DTO 优先读取已审核详情，空记录自动补全', () => {
  const base = {
    id: 'howo-6x4-cargo-truck', name: 'Howo 6X4 Cargo Truck', description: 'Cargo truck.',
    categoryId: 'heavy-truck', subcategoryId: 'heavy-truck:cargo-truck', image: '/truck.webp', bannerImage: null,
    specifications: JSON.stringify({ 'Drive type': '6x4', Power: '266-430PS' }), features: '[]', detailedFeatures: '{}', galleryImages: '[]',
    normalizedSpecs: '{}', applicationTags: '[]', marketTags: '[]', performanceItems: [],
  }
  const listing = toProductDto({ ...base, detailContent: '{}' } as never)
  const reviewed = toProductDto({ ...base, detailContent: JSON.stringify({ performanceSummary: 'Reviewed summary.' }) } as never, { includeDetailContent: true })
  const generated = toProductDto({ ...base, detailContent: '{}' } as never, { includeDetailContent: true })

  assert.equal(listing.detailContent, undefined)
  assert.equal(reviewed.detailContent?.performanceSummary, 'Reviewed summary.')
  assert.equal(generated.detailContent?.faqs.length, 5)
})

test('专用车详情不混入拖挂场景，也不向用户展示内部产品 slug', () => {
  const source = allProducts.find((item) => item.id === 'sinotruck-howo-water-tanker')!
  const product = preparePublishedProduct(source)
  const content = generateProductDetailContent(product)
  const visibleCopy = JSON.stringify({
    performanceSummary: content.performanceSummary,
    performanceItems: content.performanceItems.map(({ title, description }) => ({ title, description })),
    applicationAreas: content.applicationAreas.map(({ title, description, bullets }) => ({ title, description, bullets })),
    solutions: content.solutions.map(({ title, description, bullets }) => ({ title, description, bullets })),
    faqs: content.faqs,
  })

  assert.equal(content.applicationAreas[0].title, 'Water transport and site support')
  assert.match(content.performanceSummary, /336 HP/i)
  assert.doesNotMatch(content.performanceSummary, /engine brand/i)
  assert.doesNotMatch(visibleCopy, /trailer structure|port and terminal logistics/i)
  assert.doesNotMatch(visibleCopy, /catalogue reference|sinotruck-howo-water-tanker/i)
})
