import assert from 'node:assert/strict'
import test from 'node:test'
import { auditSeo } from '../lib/seo/health'

test('SEO health report identifies missing canonical, duplicate title, missing alt, and orphan page', () => {
  const report = auditSeo([{ url: '/one', title: 'Same', canonical: '', images: [{ alt: '' }], links: ['/two'] }, { url: '/two', title: 'Same', canonical: '/two', images: [], links: [] }])
  assert.deepEqual(report.issues.map((issue) => issue.code), ['missing_canonical', 'duplicate_title', 'missing_alt', 'orphan_page'])
})
