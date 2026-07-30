import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveShortlist } from '../lib/procurement/resolve-shortlist';

test('候选清单按加入顺序解析产品和配件，跳过失效 ID', () => {
  const result = resolveShortlist(['part-1', 'truck-1', 'missing'], [{ id: 'truck-1', name: 'Truck' }], [{ id: 'part-1', name: 'Part' }]);
  assert.deepEqual(result.map((item) => item.id), ['part-1', 'truck-1']);
});
