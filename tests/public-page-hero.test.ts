import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('其余公开子页使用统一的本地图片页头', async () => {
  for (const file of ['../pages/about.tsx', '../pages/service.tsx', '../pages/contact.tsx', '../pages/shortlist.tsx', '../pages/privacy.tsx', '../pages/terms.tsx', '../pages/404.tsx']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /PageHero/);
  }
});
