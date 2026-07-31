import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('product detail composes one grouped specification source with the complete procurement journey', async () => {
  const [detail, actions] = await Promise.all([
    readFile(new URL('../components/product/ProductDetail.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/StickyRfqActions.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(detail, /const groups = groupSpecifications\(product\.specifications\)/);
  assert.match(detail, /<KeySpecCluster groups=\{groups\} maxItems=\{5\} \/>/);
  assert.match(detail, /<GroupedSpecifications groups=\{groups\} \/>/);
  assert.equal(detail.match(/groupSpecifications\(product\.specifications\)/g)?.length, 1);
  assert.doesNotMatch(detail, /SpecificationTable specifications=\{product\.detailedFeatures\}/);
  assert.match(detail, /<ProductMediaPanel/);
  assert.match(detail, /product\.galleryImages/);
  assert.match(actions, /Add to shortlist/);
  assert.match(actions, /Compare/);
  assert.match(actions, /Prepare (?:an )?RFQ/);
});

test('grouped detail components preserve the four procurement headings and honest data-review copy', async () => {
  const [specifications, keySpecs] = await Promise.all([
    readFile(new URL('../components/industrial/catalogue/GroupedSpecifications.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/KeySpecCluster.tsx', import.meta.url), 'utf8'),
  ]);

  for (const heading of ['Powertrain', 'Chassis', 'Dimensions', 'Capacity']) {
    assert.match(specifications, new RegExp(`['"]${heading}['"]`));
  }
  assert.match(specifications, /Data review/);
  assert.match(specifications, /Not published/);
  assert.doesNotMatch(`${specifications}\n${keySpecs}`, /detailedFeatures/);
});
