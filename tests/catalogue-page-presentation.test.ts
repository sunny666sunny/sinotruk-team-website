import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('目录类页面使用本地 Banner，详情页保留产品图片与完整参数入口', async () => {
  const [catalogue, category, detail, parts, partDetail, news, article] = await Promise.all([
    readFile(new URL('../pages/products/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/products/[category].tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/product/ProductDetail.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/parts/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/parts/[part].tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/news/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/news/[slug].tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(catalogue, /Heavy-Truck\.webp/);
  assert.match(category, /category\.bannerImage/);
  assert.match(detail, /Product Details/);
  assert.match(detail, /Available specifications/);
  assert.match(parts, /banner-parts\.webp/);
  assert.match(partDetail, /Product specifications/);
  assert.match(news, /banner-news\.webp/);
  assert.match(article, /item\.image/);
});
