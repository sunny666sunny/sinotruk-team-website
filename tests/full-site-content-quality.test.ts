import assert from 'node:assert/strict'
import test from 'node:test'

import { newsItems } from '../data/news'
import { auditReviewedNews } from '../lib/content/editorial-audit'

test('reviewed news has no high-risk claim, dated SEO promise, or duplicate metadata', () => {
  assert.deepEqual(auditReviewedNews(newsItems), [])
})
