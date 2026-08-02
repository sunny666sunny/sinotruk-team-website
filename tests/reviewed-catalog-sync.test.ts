import assert from 'node:assert/strict'
import test from 'node:test'

import { allProducts } from '../data/products'
import {
  buildReviewedProductDatabaseUpdate,
  synchronizeReviewedCatalog,
} from '../lib/product-data/reviewed-catalog-sync'

const recordFromSource = (source: (typeof allProducts)[number]) => ({
  id: source.id,
  name: source.name,
  description: source.description,
  categoryId: source.category,
  subcategoryId: `${source.category}:${source.subcategory}`,
  image: source.image,
  bannerImage: source.bannerImage || null,
  specifications: JSON.stringify(source.specifications),
  features: JSON.stringify(source.features || []),
  detailedFeatures: JSON.stringify(source.detailedFeatures || {}),
  galleryImages: JSON.stringify(source.galleryImages || []),
  detailContent: '{}',
  normalizedSpecs: '{}',
  applicationTags: '[]',
  marketTags: '[]',
  performanceItems: source.performanceItems || [],
})

test('审核同步把校正后的产品事实写成数据库可直接发布的字段', () => {
  const source = allProducts.find((item) => item.id === 'sinotruck-pickup-off-road-version')!
  const update = buildReviewedProductDatabaseUpdate(recordFromSource(source))
  const specifications = JSON.parse(update.data.specifications)
  const normalizedSpecs = JSON.parse(update.data.normalizedSpecs)
  const detailContent = JSON.parse(update.data.detailContent)

  assert.equal(specifications['Engine model'], 'WP2H 2.0T')
  assert.equal(normalizedSpecs['Drive type'], '4×4')
  assert.equal(normalizedSpecs.drive, '4×4')
  assert.deepEqual(JSON.parse(update.data.detailedFeatures), {})
  assert.ok(detailContent.faqs.length >= 4 && detailContent.faqs.length <= 6)
  assert.ok(detailContent.performanceItems.every((item: { image: string }) => !/perf-img\d+/i.test(item.image)))
  assert.deepEqual(update.performanceItems, detailContent.performanceItems)
})

test('审核同步先创建旧库快照，再在单次提交中更新全部 60 款且不删除产品', async () => {
  const events: string[] = []
  const rows = allProducts.map(recordFromSource)
  const result = await synchronizeReviewedCatalog({
    readProducts: async () => rows,
    createBackup: async () => {
      events.push('backup')
      return { databaseCopy: 'before-sync.db' }
    },
    commit: async (updates) => {
      events.push(`commit:${updates.length}`)
      assert.equal(updates.length, 60)
      assert.equal(new Set(updates.map((item) => item.id)).size, 60)
    },
  })

  assert.deepEqual(events, ['backup', 'commit:60'])
  assert.equal(result.reviewedProducts, 60)
  assert.equal(result.databaseCopy, 'before-sync.db')
})

test('数据库缺少任何审核产品时立即停止，既不备份也不写入', async () => {
  let backupCalled = false
  let commitCalled = false
  await assert.rejects(
    synchronizeReviewedCatalog({
      readProducts: async () => allProducts.slice(1).map(recordFromSource),
      createBackup: async () => {
        backupCalled = true
        return { databaseCopy: 'unexpected.db' }
      },
      commit: async () => {
        commitCalled = true
      },
    }),
    /数据库产品集合与 60 款审核清单不一致/,
  )
  assert.equal(backupCalled, false)
  assert.equal(commitCalled, false)
})

test('审核同步会替换旧版错配详情，而不是把它误判为人工审核内容', () => {
  const source = allProducts.find((item) => item.id === 'sinotruck-howo-water-tanker')!
  const wrongStoredContent = {
    performanceSummary: 'Legacy generated summary.',
    performanceItems: [{ title: 'Legacy', description: 'Legacy.', image: source.image }],
    gallery: [{ image: source.image, alt: source.name, title: source.name, description: source.name }],
    applicationAreas: [{ title: 'Port and terminal logistics', description: 'Trailer structure review.', bullets: ['Trailer compatibility'], image: source.image, href: '/products' }],
    solutions: [{ title: 'Legacy solution', description: 'Legacy.', bullets: ['Legacy'], image: source.image }],
    faqs: Array.from({ length: 5 }, (_, index) => ({ question: `Legacy ${index}?`, answer: 'Legacy.' })),
  }
  const update = buildReviewedProductDatabaseUpdate({
    ...recordFromSource(source),
    detailContent: JSON.stringify(wrongStoredContent),
  })
  const detailContent = JSON.parse(update.data.detailContent)

  assert.equal(detailContent.applicationAreas[0].title, 'Water transport and site support')
  assert.doesNotMatch(JSON.stringify(detailContent), /Trailer structure review|Legacy generated summary/)
})
