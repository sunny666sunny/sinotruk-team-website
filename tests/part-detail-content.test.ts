import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

test('part detail uses compatibility-first procurement language without unsupported assurances', async () => {
  const source = await readFile(new URL('../pages/parts/[part].tsx', import.meta.url), 'utf8')
  assert.match(source, /Compatibility confirmation/i)
  assert.match(source, /truck model or VIN/i)
  assert.doesNotMatch(source, /100% authentic|Global Shipping|Fast delivery|Dedicated support/i)
})
