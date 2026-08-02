import assert from 'node:assert/strict'
import test from 'node:test'

import { newsItems, newsRedirects } from '../data/news'

const bannedClaims = [
  'authorized dealer',
  'factory-direct price',
  'best price',
  'financing available',
  'manufacturer warranty',
  'immediate delivery',
  'leading manufacturer',
  'guaranteed',
]

test('news catalogue contains 14 distinct pillars and 22 redirects', () => {
  const canonicalSlugs = new Set(newsItems.map((item) => item.slug))
  const removedSlugs = Object.keys(newsRedirects)

  assert.equal(newsItems.length, 14)
  assert.equal(canonicalSlugs.size, 14)
  assert.equal(removedSlugs.length, 22)
  assert.equal(new Set([...canonicalSlugs, ...removedSlugs]).size, 36)

  for (const [source, destination] of Object.entries(newsRedirects)) {
    assert.ok(!canonicalSlugs.has(source), `${source} must not remain as an article`)
    assert.ok(canonicalSlugs.has(destination), `${destination} must be a canonical article`)
  }
})

test('each pillar has an independent SEO and editorial contract', () => {
  assert.equal(new Set(newsItems.map((item) => item.title.toLowerCase())).size, 14)
  assert.equal(new Set(newsItems.map((item) => item.seoTitle.toLowerCase())).size, 14)
  assert.equal(new Set(newsItems.map((item) => item.seoDescription.toLowerCase())).size, 14)
  assert.equal(new Set(newsItems.map((item) => item.keywords[0]?.toLowerCase())).size, 14)

  for (const item of newsItems) {
    const words = item.content.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) ?? []
    const headings = item.content.match(/^##\s+.+$/gm) ?? []
    const listItems = item.content.match(/^-\s+.+$/gm) ?? []
    const searchable = `${item.title} ${item.excerpt} ${item.content} ${item.seoTitle} ${item.seoDescription}`.toLowerCase()

    assert.ok(words.length >= 300, `${item.slug} has only ${words.length} words`)
    assert.ok(headings.length >= 3 && headings.length <= 6, `${item.slug} needs 3-6 H2 headings`)
    assert.ok(listItems.length >= 3, `${item.slug} needs a useful checklist`)
    assert.ok(item.keywords.length >= 3 && item.keywords.length <= 5)
    assert.ok(item.internalLinks.length >= 1 && item.internalLinks.length <= 4)
    assert.equal(item.updatedAt, '2026-08-02')
    assert.ok(!/\b2025\b/.test(`${item.seoTitle} ${item.seoDescription}`))
    for (const claim of bannedClaims) assert.ok(!searchable.includes(claim), `${item.slug} contains ${claim}`)
  }
})
