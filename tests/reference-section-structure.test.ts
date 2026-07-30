import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('About 与 Service 保持参照站的栏目入口，而不是采购流程页', async () => {
  const aboutSource = await readFile(new URL('../pages/about.tsx', import.meta.url), 'utf8')
  const serviceSource = await readFile(new URL('../pages/service.tsx', import.meta.url), 'utf8')

  assert.doesNotMatch(aboutSource, /procurement-focused sales and export service team|What our team does/)
  for (const path of ['/about/who-we-are', '/about/our-journey', '/about/our-facilities', '/about/social-responsibility']) {
    assert.ok(aboutSource.includes(path))
  }

  assert.doesNotMatch(serviceSource, /Requirement confirmation|Quotation preparation|Procurement support/)
  for (const path of ['/service/after-sales-service', '/service/service-broadcast', '/service/maintenance-manual']) {
    assert.ok(serviceSource.includes(path))
  }
})
