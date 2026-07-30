import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { allProducts } from '../data/products';

test('全部产品详情引用的 Banner、主图、性能图和图库文件均在本地', () => {
  const imagePaths = allProducts.flatMap((product) => [
    product.image,
    product.bannerImage,
    ...(product.galleryImages || []),
    ...(product.performanceItems || []).map((item) => item.image),
  ]).filter(Boolean) as string[];
  const missing = [...new Set(imagePaths.filter((image) => !existsSync(`public${image}`)))];
  assert.deepEqual(missing, []);
});
