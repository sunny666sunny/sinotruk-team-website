import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

import { extractFactPacket, parseFeed } from '../lib/content-automation/extract'

test('feed and article extraction retain only usable editorial facts', async () => {
  const feed = await readFile(new URL('./fixtures/source-feed.xml', import.meta.url), 'utf8')
  const article = await readFile(new URL('./fixtures/source-article.html', import.meta.url), 'utf8')
  const items = parseFeed(feed, 'https://publisher.example/feed.xml')

  assert.deepEqual(items, [{ title: 'New truck export guidance', url: 'https://publisher.example/article', date: '2026-07-20' }])
  assert.deepEqual(extractFactPacket(article, items[0]), {
    sourceUrl: 'https://publisher.example/article',
    sourceTitle: 'New truck export guidance',
    sourceDate: '2026-07-20',
    facts: ['The guide covers configuration documents for cross-border procurement.', 'Buyers should confirm destination requirements before selecting a vehicle.'],
    quotedEntities: ['Export Documentation Council'],
    productHints: ['vehicle'],
  })
})
