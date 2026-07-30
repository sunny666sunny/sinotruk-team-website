import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('页眉提供参考站的完整栏目入口，并明确排除两个不需要的全球栏目', async () => {
  const source = await readFile(new URL('../components/layout/Header.tsx', import.meta.url), 'utf8');

  for (const label of [
    'Home',
    'About Us',
    'Who We Are',
    'Our Journey',
    'Our Facilities',
    'Social Responsibility',
    'Products',
    'Parts',
    'News',
    'Video',
    'Service',
    'After-sales Service',
    'Service Broadcast',
    'Maintenance Manual',
    'Contact Us',
  ]) {
    assert.match(source, new RegExp(label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }

  assert.doesNotMatch(source, /Global Headquarters/);
  assert.doesNotMatch(source, /Global Presence/);
});
