import assert from 'node:assert/strict'
import test from 'node:test'

import { assertFetchableSource } from '../lib/content-automation/source-policy'
import { fingerprintUrl } from '../lib/content-automation/fingerprint'

test('source policy rejects local, private, non-HTTP, and unapproved sources', async () => {
  const policy = { allowedHosts: ['publisher.example'], maxBytes: 2_000_000, timeoutMs: 10_000, maxRedirects: 3 }
  const lookup = async () => ['93.184.216.34']

  for (const url of ['http://127.0.0.1/article', 'http://169.254.169.254/latest', 'file:///etc/passwd', 'https://outside.example/article']) {
    await assert.rejects(() => assertFetchableSource(url, policy, lookup))
  }
  await assert.rejects(() => assertFetchableSource('https://publisher.example/article', policy, async () => ['10.0.0.1']))
  await assert.doesNotReject(() => assertFetchableSource('https://publisher.example/article', policy, lookup))
})

test('URL fingerprint removes tracking values while retaining the article identity', () => {
  assert.equal(fingerprintUrl('https://publisher.example/story?utm_source=newsletter'), fingerprintUrl('https://publisher.example/story'))
  assert.notEqual(fingerprintUrl('https://publisher.example/story?a=1'), fingerprintUrl('https://publisher.example/story?a=2'))
})
