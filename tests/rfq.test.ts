import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSelectionPayload, normalizeRfqSubmission, readRfqSelection } from '../lib/procurement/rfq';

test('RFQ 只保留去重后的产品或配件 ID', () => {
  assert.deepEqual(buildSelectionPayload(['truck-1', 'truck-1', 'part-2']), ['truck-1', 'part-2']);
});

test('空的本地候选清单安全降级为空数组', () => {
  assert.deepEqual(readRfqSelection(null), []);
  assert.deepEqual(readRfqSelection('not-json'), []);
});

test('RFQ 规范化后保留采购字段并要求同意联系', () => {
  const result = normalizeRfqSubmission({ name: 'Ada', phone: '+86 1', email: 'ada@example.com', country: 'Kenya', message: 'Need trucks', selections: ['truck-1'], quantity: '2', useCase: 'Mining', destinationPort: 'Mombasa', consent: true });
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.data, { name: 'Ada', phone: '+86 1', email: 'ada@example.com', country: 'Kenya', message: 'Need trucks', selectionPayload: ['truck-1'], quantity: 2, useCase: 'Mining', destinationPort: 'Mombasa', consent: true });
});
