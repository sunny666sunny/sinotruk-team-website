import assert from 'node:assert/strict'
import test from 'node:test'

import { publishGeneratedArticle } from '../lib/content-automation/publish'
import type { GeneratedArticle } from '../lib/content-automation/generate'

const article: GeneratedArticle = { title: 'Planning an export truck request', slug: 'planning-export-truck-request', excerpt: 'A practical checklist for buyers preparing an export truck request.', body: Array.from({ length: 45 }, () => 'Buyers should review destination requirements and confirm the vehicle configuration before issuing an RFQ.').join(' '), seoTitle: 'Planning an export truck request for commercial vehicle buyers', seoDescription: 'Use this practical checklist to prepare a commercial truck request, review destination requirements, and ask for the right configuration.', keywords: ['truck export'], relatedProductIds: ['/products'], sourceUrl: 'https://publisher.example/article', sourceTitle: 'Export requirements update', sourceDate: '2026-07-20' }

test('publishing writes the news item, revision, and completed job in one transaction', async () => {
  const calls: string[] = []
  const db = {
    $transaction: async (work: (tx: any) => Promise<unknown>) => work({
      news: { upsert: async () => ({ id: 'news-1' }) },
      newsRevision: { create: async () => calls.push('revision') },
      contentJob: { update: async () => calls.push('job') },
    }),
  }
  const result = await publishGeneratedArticle(article, 'job-1', { db: db as any, now: () => new Date('2026-07-30T00:00:00.000Z') })
  assert.equal(result.newsId, 'news-1')
  assert.deepEqual(calls, ['revision', 'job'])
})
