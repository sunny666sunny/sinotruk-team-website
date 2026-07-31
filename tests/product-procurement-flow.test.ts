import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { toCatalogueProduct } from '../components/industrial/catalogue/IndustrialProductCard';

test('product catalogue exposes the complete procurement toolbar and card actions', async () => {
  const [catalogue, toolbar, card] = await Promise.all([
    readFile(new URL('../pages/products/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/CatalogueToolbar.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/IndustrialProductCard.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(catalogue, /<CatalogueToolbar/);
  assert.match(catalogue, /<ProductFilters/);
  assert.match(catalogue, /<FilterDrawer/);
  assert.match(toolbar, /Showing \{count\} vehicles/);
  assert.match(toolbar, /aria-label="Sort products"/);
  assert.match(card, /Add to shortlist/);
  assert.match(card, /Compare/);
  assert.match(card, /Prepare RFQ/);
});

test('category catalogue routes keep every product visible through the shared procurement controls', async () => {
  const [category, subcategory, card, filters, hero] = await Promise.all([
    readFile(new URL('../pages/products/[category].tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/products/[category]/[subcategory]/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/IndustrialProductCard.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/procurement/ProductFilters.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/layout/PageHero.tsx', import.meta.url), 'utf8'),
  ]);

  for (const source of [category, subcategory]) {
    assert.match(source, /<PageHero/);
    assert.match(source, /<CatalogueToolbar/);
    assert.match(source, /<ProductFilters/);
    assert.match(source, /<FilterDrawer/);
    assert.match(source, /useState<ProductFilterState>\(\{ drive: \[\], applications: \[\] \}\)/);
    assert.match(source, /visible\.map\(\(product\) =>/);
    assert.match(source, /<IndustrialProductCard/);
    assert.doesNotMatch(source, /<h1/);
  }
  assert.equal(hero.match(/<h1/g)?.length, 1);
  assert.match(card, /const href = `\/products\/\$\{product\.category\}\/\$\{product\.subcategory\}\/\$\{product\.id\}`/);
  assert.match(filters, /Clear all/);
});

test('catalogue view mapping only normalizes specifications that are actually published', () => {
  const product = toCatalogueProduct({
    id: 'truck-1',
    name: 'Truck 1',
    category: 'heavy-truck',
    subcategory: 'dump-truck',
    description: 'Published description',
    image: '/images/products/truck.jpg',
    specifications: { 'Drive type': '6x4', 'Engine Power': '380 hp', Cab: 'HW76' },
  });

  assert.equal(product.normalizedSpecs.drive, '6x4');
  assert.equal(product.normalizedSpecs.power, '380 hp');
  assert.deepEqual(product.applicationTags, []);
  assert.equal(product.normalizedSpecs.Cab, 'HW76');
});
