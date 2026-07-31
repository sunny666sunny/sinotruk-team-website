import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CatalogueMatrix } from '@/components/industrial/home/CatalogueMatrix'
import { productCategories } from '@/data/siteConfig'

test('industrial public theme is loaded without changing catalogue records', () => {
  const app = readFileSync('pages/_app.tsx', 'utf8')
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')
  const integrityTests = readFileSync('tests/catalog-integrity.test.ts', 'utf8')

  assert.match(app, /industrial-theme\.css/)
  assert.match(theme, /--industrial-accent:\s*#20aaa4/i)
  assert.match(integrityTests, /compareCatalogSnapshots/)
  assert.match(integrityTests, /createCatalogSnapshot/)
})

test('catalogue matrix renders all six category links in a five-column desktop grid', () => {
  const markup = renderToStaticMarkup(createElement(CatalogueMatrix, { categories: productCategories }))
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')

  assert.equal((markup.match(/href="\/products\//g) ?? []).length, 6)
  assert.match(markup, /industrial-home-catalogue-grid/)
  assert.match(theme, /grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/)
})
