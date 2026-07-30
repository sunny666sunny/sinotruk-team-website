import assert from 'node:assert/strict'
import test from 'node:test'

import { fetchSourceDocument } from '../lib/content-automation/feed'

const policy = { allowedHosts: ['publisher.example'], maxBytes: 120, timeoutMs: 10_000, maxRedirects: 1 }
const lookup = async () => ['93.184.216.34']

test('safe source fetching validates content type, redirect destination, and byte limit', async () => {
  const xml = '<rss><channel /></rss>'
  const result = await fetchSourceDocument('https://publisher.example/feed.xml', policy, { lookup, fetch: async () => new Response(xml, { headers: { 'content-type': 'application/rss+xml' } }) })
  assert.equal(result.body, xml)

  await assert.rejects(() => fetchSourceDocument('https://publisher.example/feed.xml', policy, { lookup, fetch: async () => new Response('no', { headers: { 'content-type': 'text/plain' } }) }))
  await assert.rejects(() => fetchSourceDocument('https://publisher.example/feed.xml', policy, { lookup, fetch: async () => new Response(null, { status: 302, headers: { location: 'https://outside.example/article' } }) }))
  await assert.rejects(() => fetchSourceDocument('https://publisher.example/feed.xml', policy, { lookup, fetch: async () => new Response('x'.repeat(121), { headers: { 'content-type': 'text/html' } }) }))
})
