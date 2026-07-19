import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('产品和配件编辑页明确提供归档后的重新启用控件', async () => {
  const productPage = await readFile('pages/admin/products/[id].tsx', 'utf8')
  const partPage = await readFile('pages/admin/parts/[id].tsx', 'utf8')

  assert.match(productPage, /重新启用此产品/)
  assert.match(partPage, /重新启用此配件/)
  assert.match(productPage, /isActive: true/)
  assert.match(partPage, /isActive: true/)
})
