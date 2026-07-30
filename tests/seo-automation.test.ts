import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveSeo } from '../lib/seo/resolve'
import { renderSitemap } from '../lib/seo/sitemap'
import { renderRobots } from '../lib/seo/robots'

test('resolved product SEO has canonical JSON-LD without a price offer', () => {
  const seo = resolveSeo({ path: '/products/heavy-truck/dump/howo', pageType: 'product', name: 'HOWO Dump Truck', description: 'Configuration guidance for export buyers.', image: '/truck.webp' }, 'https://example.com')
  assert.equal(seo.canonical, 'https://example.com/products/heavy-truck/dump/howo')
  assert.equal(seo.jsonLd[0]['@type'], 'Product')
  assert.equal(JSON.stringify(seo.jsonLd), JSON.stringify(seo.jsonLd).replace(/"offers"\s*:[^,}]+,?/g, ''))
})

test('sitemap and robots use canonical absolute URLs and expose no Baidu submission', () => {
  const xml = renderSitemap([{ url: 'https://example.com/products' }])
  assert.match(xml, /https:\/\/example\.com\/products/)
  const robots = renderRobots('https://example.com')
  assert.match(robots, /Sitemap: https:\/\/example\.com\/sitemap\.xml/)
  assert.doesNotMatch(robots, /baidu/i)
})
