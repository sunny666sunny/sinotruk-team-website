import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('homepage renders ten semantic sections and all six categories', () => {
  const source = readFileSync('pages/index.tsx', 'utf8')

  for (const component of [
    'CinematicHero',
    'CatalogueMatrix',
    'FeaturedVehicleRail',
    'BrandIdentitySection',
    'EngineeringSection',
    'ApplicationMatrix',
    'ProcurementSupportSection',
    'PartsEntrySection',
    'EditorialSection',
    'FinalRfqSection',
  ]) {
    assert.match(source, new RegExp(`<${component}`))
  }

  assert.doesNotMatch(source, /<AllProducts/)
})
