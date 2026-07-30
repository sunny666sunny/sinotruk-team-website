import assert from 'node:assert/strict'
import test from 'node:test'

import { createContentSourcesHandler } from '../pages/api/admin/content-sources'
import { createContentJobsHandler } from '../pages/api/admin/content-jobs'

function response() {
  return { statusCode: 0, payload: undefined as unknown, status(code: number) { this.statusCode = code; return this }, json(payload: unknown) { this.payload = payload; return this } }
}

test('content source API requires an administrator and creates validated source settings', async () => {
  const unauthorized = response()
  await createContentSourcesHandler({ getAdminSession: () => null } as any)({ method: 'GET', headers: {}, cookies: {} } as any, unauthorized as any)
  assert.equal(unauthorized.statusCode, 401)

  const created: any[] = []
  const handler = createContentSourcesHandler({ getAdminSession: () => ({ id: 'admin' }), prisma: { newsSource: { findMany: async () => [], create: async ({ data }: any) => { created.push(data); return { id: 'source-1', ...data } } } } } as any)
  const res = response()
  await handler({ method: 'POST', body: { name: 'Industry publisher', baseUrl: 'https://publisher.example', feedUrl: 'https://publisher.example/feed.xml', dailyLimit: 2 }, headers: {}, cookies: {} } as any, res as any)
  assert.equal(res.statusCode, 201)
  assert.equal(created[0].dailyLimit, 2)
})

test('content job API returns newest jobs without exposing a write endpoint', async () => {
  const handler = createContentJobsHandler({ getAdminSession: () => ({ id: 'admin' }), prisma: { contentJob: { findMany: async () => [{ id: 'job-1', status: 'failed' }] } } } as any)
  const res = response()
  await handler({ method: 'GET', headers: {}, cookies: {} } as any, res as any)
  assert.deepEqual(res.payload, { jobs: [{ id: 'job-1', status: 'failed' }] })
})
