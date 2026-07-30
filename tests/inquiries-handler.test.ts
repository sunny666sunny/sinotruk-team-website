import assert from 'node:assert/strict';
import test from 'node:test';
import { createInquiriesHandler } from '../pages/api/admin/inquiries';

const response = () => { const result: any = {}; result.status = (code: number) => { result.code = code; return result; }; result.json = (body: unknown) => { result.body = body; return result; }; return result; };

test('询盘 API 拒绝未认证请求', async () => {
  const handler = createInquiriesHandler({ getAdminSession: () => null } as any);
  const res = response();
  await handler({ method: 'GET', query: {} } as any, res);
  assert.equal(res.code, 401);
});

test('询盘 API 返回最新记录及采购字段', async () => {
  const inquiries = [{ id: 'i1', name: 'Ada', selectionPayload: '["truck-1"]' }];
  const handler = createInquiriesHandler({ getAdminSession: () => ({ id: 'a', username: 'admin' }), prisma: { inquiry: { findMany: async () => inquiries } } } as any);
  const res = response();
  await handler({ method: 'GET', query: {} } as any, res);
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { inquiries: [{ id: 'i1', name: 'Ada', selectionPayload: ['truck-1'] }] });
});
