import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('产品链路先显示分类与子分类，再进入型号、参数和询盘', async () => {
  const [catalogue, category, detail] = await Promise.all([
    readFile(new URL('../pages/products/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/products/[category].tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/product/ProductDetail.tsx', import.meta.url), 'utf8'),
  ])

  assert.match(catalogue, /ProductCategoryNavigation/)
  assert.match(category, /Browse by vehicle type/)
  assert.match(category, /\/products\/\$\{category\.id\}\/\$\{subcategory\.id\}/)
  assert.ok(detail.indexOf('Available specifications') < detail.indexOf('Product gallery'))
  assert.match(detail, /Prepare an RFQ/)
})
