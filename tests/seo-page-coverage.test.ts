import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

test('core catalogue detail pages use the shared SEO head', async () => {
  for (const file of ['../pages/products/[category]/[subcategory]/[product].tsx', '../pages/parts/[part].tsx']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /SeoHead/)
  }
})

test('app shell supplies a query-free canonical fallback for every public route', async () => {
  const source = await readFile(new URL('../pages/_app.tsx', import.meta.url), 'utf8')
  assert.match(source, /key="canonical"/)
  assert.match(source, /router\.asPath\.split\('\?'\)/)
})
