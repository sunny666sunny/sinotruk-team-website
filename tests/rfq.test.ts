import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSelectionPayload, readRfqSelection } from '../lib/procurement/rfq';

test('RFQ 只保留去重后的产品或配件 ID', () => {
  assert.deepEqual(buildSelectionPayload(['truck-1', 'truck-1', 'part-2']), ['truck-1', 'part-2']);
});

test('空的本地候选清单安全降级为空数组', () => {
  assert.deepEqual(readRfqSelection(null), []);
  assert.deepEqual(readRfqSelection('not-json'), []);
});
