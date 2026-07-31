import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('footer maps the existing About, Products, Parts and Service navigation groups', async () => {
  const source = await readFile(new URL('../components/industrial/IndustrialFooter.tsx', import.meta.url), 'utf8')

  for (const label of ['ABOUT US', 'Who We Are', 'Our Journey', 'Our Facilities', 'Social Responsibility', 'PRODUCTS', 'PARTS', 'SERVICE', 'After-sales Service', 'Service Broadcast', 'Maintenance Manual', 'Video']) {
    assert.match(source, new RegExp(label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')))
  }

  assert.doesNotMatch(source, /Global Headquarters/)
  assert.doesNotMatch(source, /Global Presence/)
  assert.match(source, /productCategories\.map/)
  assert.match(source, /partCategories\.map/)
  assert.match(source, /href="\/sitemap\.xml"/)
  assert.doesNotMatch(source, /<a href="\/sitemap\.xml"/)
})

test('public footer remains a thin industrial shell wrapper', async () => {
  const source = await readFile(new URL('../components/layout/Footer.tsx', import.meta.url), 'utf8')

  assert.match(source, /<IndustrialFooter \/>/)
})
