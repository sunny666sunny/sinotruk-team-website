import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parts, partCategories } from '../data/parts';
import { filterParts } from '../lib/procurement/filter-parts';

test('parts catalogue retains every published category and part-number search', () => {
  const publishedCategories = new Set(parts.map((part) => part.category));

  assert.deepEqual(
    partCategories.map((category) => category.id).sort(),
    [...publishedCategories].sort(),
  );

  const knownPart = parts.find((part) => part.partNumber === 'VG2600020220');
  assert.ok(knownPart);
  assert.deepEqual(
    filterParts(parts, { category: knownPart.category, query: knownPart.partNumber.toLowerCase() }).map((part) => part.id),
    [knownPart.id],
  );
});

test('parts catalogue uses the shared hero and an industrial contain-fit parts stage', async () => {
  const source = await readFile(new URL('../pages/parts/index.tsx', import.meta.url), 'utf8');

  assert.match(source, /<PageHero/);
  assert.match(source, /className="industrial-page/);
  assert.match(source, /aria-label="Parts categories"/);
  assert.match(source, /object-contain/);
  assert.match(source, /bg-\[var\(--industrial-panel\)\]/);
});
