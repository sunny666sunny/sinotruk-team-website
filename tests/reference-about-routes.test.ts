import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = [
  ['pages/about/who-we-are.tsx', 'Who We Are'],
  ['pages/about/our-journey.tsx', 'Our Journey'],
  ['pages/about/our-facilities.tsx', 'Our Facilities'],
  ['pages/about/social-responsibility.tsx', 'Social Responsibility'],
] as const;

test('About 下拉的四个参考站页面均有本地化图文页面', async () => {
  for (const [file, title] of routes) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(title));
    assert.match(source, /\/images\/reference\//);
  }
});
