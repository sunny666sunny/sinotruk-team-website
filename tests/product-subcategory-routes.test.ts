import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { allProducts } from '../data/products';
import { productCategories } from '../data/siteConfig';

test('every catalogue product retains a valid category and subcategory route', () => {
  for (const product of allProducts) {
    const category = productCategories.find((item) => item.id === product.category);
    assert.ok(category, `Missing category route for ${product.id}`);
    assert.ok(
      category.subcategories.some((item) => item.id === product.subcategory),
      `Missing subcategory route for ${product.id}`,
    );
  }
});

test('subcategory pages generate routes and keep the exact product detail route builder', async () => {
  const [route, card] = await Promise.all([
    readFile(new URL('../pages/products/[category]/[subcategory]/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/IndustrialProductCard.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(route, /getStaticPaths/);
  assert.match(route, /category\.subcategories\.map/);
  assert.match(card, /`\/products\/\$\{product\.category\}\/\$\{product\.subcategory\}\/\$\{product\.id\}`/);
});
