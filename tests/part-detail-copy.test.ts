import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('part detail makes the part number prominent on a contain-fit industrial stage', async () => {
  const source = await readFile(new URL('../pages/parts/[part].tsx', import.meta.url), 'utf8');

  assert.match(source, /className="industrial-page/);
  assert.match(source, /Part number:/);
  assert.match(source, /text-\[var\(--industrial-accent\)\]/);
  assert.match(source, /object-contain/);
  assert.match(source, /bg-\[var\(--industrial-panel\)\]/);
});

test('part detail asks for vehicle evidence without promising compatibility', async () => {
  const source = await readFile(new URL('../pages/parts/[part].tsx', import.meta.url), 'utf8');

  assert.match(source, /Compatibility must be confirmed/);
  assert.match(source, /truck model or VIN/);
  assert.doesNotMatch(source, /\b(?:guaranteed|fits all|fully compatible)\b/i);
});
