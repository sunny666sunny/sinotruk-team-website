import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('首页采用参照站的目录优先顺序，并使用后台产品数据输出完整产品入口', async () => {
  const homeSource = await readFile(new URL('../pages/index.tsx', import.meta.url), 'utf8')
  const homeSectionsSource = await readFile(new URL('../components/industrial/home/HomeSections.tsx', import.meta.url), 'utf8')
  const headerSource = await readFile(new URL('../components/layout/Header.tsx', import.meta.url), 'utf8')

  assert.doesNotMatch(homeSource, /GlobalBusiness|ProcurementPaths/)
  assert.match(homeSource, /getPublishedProducts/)
  assert.ok(homeSource.indexOf('<CatalogueMatrix') < homeSource.indexOf('<FeaturedVehicleRail'))
  assert.match(homeSectionsSource, /FeaturedVehicleRailProps = \{ products: ProcurementProduct\[\] \}/)
  assert.ok(!homeSectionsSource.includes("from '@/data/products'"))
  assert.doesNotMatch(headerSource, /ShortlistButton/)
})
