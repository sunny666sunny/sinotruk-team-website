import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('首页首屏突出目录和询盘且没有虚假官方措辞', async () => {
  const source = await readFile(new URL('../components/home/HeroBanner.tsx', import.meta.url), 'utf8');
  assert.match(source, /Explore Product Range/);
  assert.match(source, /Request a Quote/);
  assert.doesNotMatch(source, /official exclusive|factory direct/i);
});
