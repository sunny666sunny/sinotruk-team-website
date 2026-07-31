import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('industrial public theme is loaded without changing catalogue records', () => {
  const app = readFileSync('pages/_app.tsx', 'utf8')
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')
  const integrityTests = readFileSync('tests/catalog-integrity.test.ts', 'utf8')

  assert.match(app, /industrial-theme\.css/)
  assert.match(theme, /--industrial-accent:\s*#20aaa4/i)
  assert.match(integrityTests, /compareCatalogSnapshots/)
  assert.match(integrityTests, /createCatalogSnapshot/)
})
