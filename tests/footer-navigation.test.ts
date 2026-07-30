import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('页脚复用参考站的关于、产品、配件、服务四组导航且不含排除栏目', async () => {
  const source = await readFile(new URL('../components/layout/Footer.tsx', import.meta.url), 'utf8');

  for (const label of ['ABOUT US', 'Who We Are', 'Our Journey', 'Our Facilities', 'Social Responsibility', 'PRODUCTS', 'PARTS', 'SERVICE', 'After-sales Service', 'Service Broadcast', 'Maintenance Manual', 'Video']) {
    assert.match(source, new RegExp(label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }

  assert.doesNotMatch(source, /Global Headquarters/);
  assert.doesNotMatch(source, /Global Presence/);
});
