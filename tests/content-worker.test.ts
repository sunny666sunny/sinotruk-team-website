import assert from 'node:assert/strict'
import test from 'node:test'

import { runSourceOnce } from '../lib/content-automation/worker'

test('a source run queues only new items up to its daily limit', async () => {
  const created: string[] = []
  const result = await runSourceOnce({ id: 'source-1', enabled: true, dailyLimit: 2, feedUrl: 'https://publisher.example/feed.xml' }, {
    fetchFeed: async () => [{ title: 'One', url: 'https://publisher.example/one' }, { title: 'Duplicate', url: 'https://publisher.example/duplicate' }, { title: 'Two', url: 'https://publisher.example/two' }, { title: 'Three', url: 'https://publisher.example/three' }],
    createJob: async (item) => { if (item.url.endsWith('duplicate')) return false; created.push(item.url); return true },
  })
  assert.deepEqual(result, { queued: 2, duplicates: 1, skippedByLimit: 1 })
  assert.deepEqual(created, ['https://publisher.example/one', 'https://publisher.example/two'])
})
