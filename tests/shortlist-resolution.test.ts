import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { resolveShortlist } from '../lib/procurement/resolve-shortlist';

test('shortlist resolves both products and parts in stored order', () => {
  const products = [{ id: 'truck-1', name: 'Truck' }];
  const parts = [{ id: 'part-1', name: 'Part' }];

  assert.deepEqual(resolveShortlist(['part-1', 'truck-1'], products, parts), [parts[0], products[0]]);
});

test('RFQ entry preserves the existing payload keys and shortlist storage flow', async () => {
  const [contact, shortlist] = await Promise.all([
    readFile(new URL('../pages/contact.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/shortlist.tsx', import.meta.url), 'utf8'),
  ]);

  for (const key of ['quantity', 'useCase', 'destinationPort', 'selections', 'consent']) {
    assert.match(contact, new RegExp(`${key}:`));
  }
  assert.match(contact, /body:\s*JSON\.stringify\(formData\)/);
  assert.match(contact, /readRfqSelection\(window\.localStorage\.getItem\(SHORTLIST_KEY\)\)/);
  assert.match(shortlist, /resolveShortlist\(ids,\s*allProducts,\s*parts\)/);
  assert.match(shortlist, /removeFromShortlist\(ids,\s*id\)/);
});

test('RFQ and shortlist surfaces expose industrial mobile-safe feedback', async () => {
  const [contact, shortlist] = await Promise.all([
    readFile(new URL('../pages/contact.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/shortlist.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(contact, /className="industrial-page/);
  assert.match(contact, /role="alert"/);
  assert.match(contact, /aria-live="polite"/);
  assert.match(contact, /min-h-12/);
  assert.match(shortlist, /className="industrial-page/);
  assert.match(shortlist, /break-words/);
});
