import assert from 'node:assert/strict';
import test from 'node:test';

import { addToShortlist, removeFromShortlist } from '../lib/procurement/shortlist';

test('清单去重并保持加入顺序', () => {
  assert.deepEqual(addToShortlist(['truck-1'], 'truck-1'), ['truck-1']);
  assert.deepEqual(addToShortlist(['truck-1'], 'truck-2'), ['truck-1', 'truck-2']);
});

test('可以从清单中移除指定条目', () => {
  assert.deepEqual(removeFromShortlist(['truck-1', 'truck-2'], 'truck-1'), ['truck-2']);
});
