import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

test('industrial product navigation exposes all six catalogue families', () => {
  const source = readFileSync('components/industrial/IndustrialHeader.tsx', 'utf8')

  for (const id of ['heavy-truck', 'light-truck', 'special-vehicle', 'light-vehicle', 'semi-trailer', 'new-energy-vehicle']) {
    assert.match(source, new RegExp(`/products/\\$\\{category\\.id\\}|${id}`))
  }

  assert.match(source, /productCategories\.map/)
  assert.match(source, /aria-expanded/)
  assert.match(source, /Escape/)
  assert.match(source, /Request Quote/)
})

test('public header remains a thin industrial shell wrapper', () => {
  const source = readFileSync('components/layout/Header.tsx', 'utf8')

  assert.match(source, /<IndustrialHeader \{\.\.\.props\} \/>/)
})
