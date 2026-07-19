import test from 'node:test'
import assert from 'node:assert/strict'

import { createProductHandler } from '../pages/api/admin/products/[id]'
import { createPartHandler } from '../pages/api/admin/parts/[id]'

function createResponse() {
  return {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) { this.statusCode = code; return this },
    json(body: unknown) { this.body = body; return this },
    async revalidate() {},
  }
}

test('产品归档处理器拒绝未认证请求且不写数据库', async () => {
  let writes = 0
  const handler = createProductHandler({
    getAdminSession: () => null,
    prisma: { product: { update: async () => { writes++; return { id: 'truck-1' } } } },
    afterContentMutation: async () => {},
  })
  const response = createResponse()

  await handler({ method: 'DELETE', query: { id: 'truck-1' }, headers: {} } as any, response as any)

  assert.equal(response.statusCode, 401)
  assert.deepEqual(response.body, { error: 'Unauthorized' })
  assert.equal(writes, 0)
})

test('产品 DELETE 归档记录并触发公开路径刷新', async () => {
  const writes: unknown[] = []
  const refreshed: string[][] = []
  const handler = createProductHandler({
    getAdminSession: () => ({ id: 'admin', username: 'admin' }),
    prisma: { product: {
      findUnique: async () => ({ categoryId: 'heavy-truck', subcategoryId: 'heavy-truck:dump-truck' }),
      update: async (args: unknown) => { writes.push(args); return { id: 'truck-1' } },
    } },
    afterContentMutation: async (_response, paths) => { refreshed.push(paths) },
  })
  const response = createResponse()

  await handler({ method: 'DELETE', query: { id: 'truck-1' }, headers: {} } as any, response as any)

  assert.deepEqual(writes, [{ where: { id: 'truck-1' }, data: { isActive: false } }])
  assert.deepEqual(response.body, { success: true, archived: true, id: 'truck-1' })
  assert.ok(refreshed[0].includes('/products/heavy-truck/dump-truck/truck-1'))
})

test('产品 PUT 可将归档记录恢复为启用', async () => {
  const writes: any[] = []
  const handler = createProductHandler({
    getAdminSession: () => ({ id: 'admin', username: 'admin' }),
    prisma: { product: {
      findUnique: async () => ({ categoryId: 'heavy-truck', subcategoryId: 'heavy-truck:dump-truck' }),
      update: async (args: any) => { writes.push(args); return { id: 'truck-1', categoryId: 'heavy-truck', subcategoryId: 'heavy-truck:dump-truck' } },
    } },
    afterContentMutation: async () => {},
  })
  const response = createResponse()

  await handler({ method: 'PUT', query: { id: 'truck-1' }, headers: {}, body: { isActive: true } } as any, response as any)

  assert.equal(writes[0].data.isActive, true)
  assert.equal((response.body as any).product.id, 'truck-1')
})

test('配件 DELETE 归档且 PUT 可恢复启用', async () => {
  const writes: any[] = []
  const handler = createPartHandler({
    getAdminSession: () => ({ id: 'admin', username: 'admin' }),
    prisma: { part: {
      findUnique: async () => ({ id: 'part-1' }),
      update: async (args: any) => {
        writes.push(args)
        return { id: 'part-1', specifications: '{}', isActive: args.data.isActive }
      },
    } },
    afterContentMutation: async () => {},
  })
  const archived = createResponse()
  const restored = createResponse()

  await handler({ method: 'DELETE', query: { id: 'part-1' }, headers: {} } as any, archived as any)
  await handler({ method: 'PUT', query: { id: 'part-1' }, headers: {}, body: { isActive: true } } as any, restored as any)

  assert.deepEqual(archived.body, { success: true, archived: true, id: 'part-1' })
  assert.equal(writes[0].data.isActive, false)
  assert.equal(writes[1].data.isActive, true)
})
