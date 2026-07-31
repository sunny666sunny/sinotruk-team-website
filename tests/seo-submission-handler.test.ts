import assert from 'node:assert/strict'
import test from 'node:test'
import { createSeoSubmitHandler } from '../pages/api/admin/seo/submit'

test('SEO submission endpoint only runs selected non-Baidu providers and records outcomes', async () => {
  const saved: any[] = []
  const calls: string[] = []
  const handler = createSeoSubmitHandler({ getAdminSession: () => ({ id: 'admin' }), submitToIndexNow: async () => { calls.push('indexnow'); return { status: 200, submitted: 1 } }, submitSitemapToGoogle: async () => { calls.push('google'); return { status: 200, sitemapUrl: 'https://example.com/sitemap.xml' } }, prisma: { seoSubmission: { create: async ({ data }: any) => { saved.push(data); return data } } } } as any)
  const res: any = { statusCode: 0, status(code: number) { this.statusCode = code; return this }, json(payload: any) { this.payload = payload; return this } }
  await handler({ method: 'POST', body: { providers: ['indexnow', 'baidu', 'google', 'bing'] }, headers: {}, cookies: {} } as any, res)
  assert.equal(res.statusCode, 200)
  assert.deepEqual(calls, ['indexnow', 'google'])
  assert.deepEqual(saved.map((entry) => entry.provider), ['indexnow', 'google'])
  assert.deepEqual(res.payload.results.map((entry: any) => entry.provider), ['indexnow', 'google'])
})
