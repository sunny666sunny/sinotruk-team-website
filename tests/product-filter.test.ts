import assert from 'node:assert/strict';
import test from 'node:test';
import { createComparison } from '../lib/procurement/compare-products';
import { filterProducts } from '../lib/procurement/filter-products';

const fixtures = [
  { id: 'p1', drive: '4x2', applicationTags: ['logistics'], normalizedSpecs: { power: '280 hp' } },
  { id: 'p2', drive: '6x4', applicationTags: ['mining'], normalizedSpecs: { power: '380 hp' } },
  { id: 'p3', drive: '6x4', applicationTags: ['mining'], normalizedSpecs: { power: '320 hp' } },
];

test('按驱动形式、用途和功率下限组合筛选', () => {
  const result = filterProducts(fixtures, { drive: ['6x4'], applications: ['mining'], powerMin: 350 });
  assert.deepEqual(result.map((item) => item.id), ['p2']);
});

test('最多比较四个产品', () => {
  assert.throws(() => createComparison(['1', '2', '3', '4', '5']), /最多 4 个/);
});
