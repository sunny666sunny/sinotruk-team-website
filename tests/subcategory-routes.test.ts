import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('产品子分类具有独立静态页面，页眉下拉直接指向该页面', async () => {
  const [route, header] = await Promise.all([
    readFile(new URL('../pages/products/[category]/[subcategory]/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/layout/Header.tsx', import.meta.url), 'utf8'),
  ]);
  assert.match(route, /getStaticPaths/);
  assert.match(route, /getProductsBySubcategory/);
  assert.match(header, /\/products\/\$\{category\.id\}\/\$\{subcategory\.id\}/);
});
