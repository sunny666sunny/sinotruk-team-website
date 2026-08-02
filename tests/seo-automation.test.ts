import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveSeo } from '../lib/seo/resolve'
import { canonicalProductEntries, renderSitemap } from '../lib/seo/sitemap'
import { renderRobots } from '../lib/seo/robots'

test('resolved product SEO has canonical JSON-LD without a price offer', () => {
  const seo = resolveSeo({ path: '/products/heavy-truck/dump/howo', pageType: 'product', name: 'HOWO Dump Truck', description: 'Configuration guidance for export buyers.', image: '/truck.webp' }, 'https://example.com')
  assert.equal(seo.canonical, 'https://example.com/products/heavy-truck/dump/howo')
  assert.equal(seo.jsonLd[0]['@type'], 'Product')
  assert.equal(JSON.stringify(seo.jsonLd), JSON.stringify(seo.jsonLd).replace(/"offers"\s*:[^,}]+,?/g, ''))
})

test('article schema identifies the editorial reviewer and modification date', () => {
  const seo = resolveSeo({
    path: '/news/reviewed-guide',
    pageType: 'article',
    name: 'Reviewed truck guide',
    description: 'A reviewed procurement guide.',
    datePublished: '2026-07-20',
    dateModified: '2026-08-02',
  })
  const article = seo.jsonLd.find((item) => item['@type'] === 'Article')
  assert.deepEqual(article?.author, { '@type': 'Organization', name: 'SINOTRUK TEAM Editorial' })
  assert.equal(article?.dateModified, '2026-08-02')
})

test('sitemap and robots use canonical absolute URLs and expose no Baidu submission', () => {
  const xml = renderSitemap([{ url: 'https://example.com/products' }])
  assert.match(xml, /https:\/\/example\.com\/products/)
  const robots = renderRobots('https://example.com')
  assert.match(robots, /Sitemap: https:\/\/example\.com\/sitemap\.xml/)
  assert.doesNotMatch(robots, /baidu/i)
})

test('sitemap只提交完全相同产品记录的主版本', () => {
  const products = canonicalProductEntries([
    { id: 'primary', name: 'HOWO Truck', specifications: '{"Drive type":"6×4"}' },
    { id: 'duplicate', name: 'HOWO Truck', specifications: '{"Drive type":"6×4"}' },
    { id: 'variant', name: 'HOWO Truck', specifications: '{"Drive type":"8×4"}' },
  ])

  assert.deepEqual(products.map((product) => product.id), ['primary', 'variant'])
})
