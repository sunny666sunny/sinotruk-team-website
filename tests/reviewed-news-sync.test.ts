import assert from 'node:assert/strict'
import test from 'node:test'

import { newsItems, newsRedirects } from '../data/news'
import { buildReviewedNewsRows, synchronizeReviewedNews } from '../lib/content/reviewed-news-sync'

test('reviewed news rows preserve editorial and SEO fields', () => {
  const rows = buildReviewedNewsRows()
  assert.equal(rows.length, 14)
  assert.deepEqual(JSON.parse(rows[0].keywords), newsItems[0].keywords)
  assert.deepEqual(JSON.parse(rows[0].internalLinks), newsItems[0].internalLinks)
  assert.equal(rows[0].updatedAt.toISOString().slice(0, 10), '2026-08-02')
})

test('reviewed news sync backs up before one commit', async () => {
  const events: string[] = []
  const result = await synchronizeReviewedNews({
    createBackup: async () => { events.push('backup'); return { databaseCopy: 'backup.db' } },
    commit: async (rows, removedSlugs) => {
      events.push('commit')
      assert.equal(rows.length, 14)
      assert.deepEqual(new Set(removedSlugs), new Set(Object.keys(newsRedirects)))
    },
  })
  assert.deepEqual(events, ['backup', 'commit'])
  assert.deepEqual(result, { reviewedNews: 14, removedNews: 22, databaseCopy: 'backup.db' })
})
