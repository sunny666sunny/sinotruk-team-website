import assert from 'node:assert/strict'
import test from 'node:test'

import { checkGeneratedArticle } from '../lib/content-automation/quality'
import type { FactPacket } from '../lib/content-automation/types'

const facts: FactPacket = { sourceUrl: 'https://publisher.example/article', sourceTitle: 'Export requirements update', sourceDate: '2026-07-20', facts: ['Buyers should confirm destination requirements before selecting a vehicle.'], quotedEntities: [], productHints: ['vehicle'] }
const passage = Array.from({ length: 45 }, () => 'Buyers should review destination requirements and confirm the vehicle configuration before issuing an RFQ.').join(' ')

test('quality gate blocks missing source, unsupported numbers, and copied source sentences', () => {
  const result = checkGeneratedArticle({ title: 'Export planning guide', slug: 'export-planning-guide', excerpt: 'A short planning guide.', body: `${passage} 99 units are always available. Buyers should confirm destination requirements before selecting a vehicle.`, seoTitle: 'Export planning guide for commercial truck buyers', seoDescription: 'A practical guide for international buyers preparing a commercial truck request for quotation and reviewing destination requirements before ordering.', keywords: ['truck export'], relatedProductIds: ['/products'], sourceUrl: '', sourceTitle: '', sourceDate: '2026-07-20' }, facts)
  assert.equal(result.publishable, false)
  assert.ok(result.issues.includes('missing_source'))
  assert.ok(result.issues.includes('unsupported_number'))
})

test('quality gate accepts fact-bound original content with complete SEO and internal links', () => {
  const result = checkGeneratedArticle({ title: 'Planning an export truck request', slug: 'planning-export-truck-request', excerpt: 'A practical checklist for buyers preparing an export truck request.', body: passage, seoTitle: 'Planning an export truck request for commercial vehicle buyers', seoDescription: 'Use this practical checklist to prepare a commercial truck request, review destination requirements, and ask for the right configuration.', keywords: ['truck export', 'RFQ checklist'], relatedProductIds: ['/products'], sourceUrl: facts.sourceUrl, sourceTitle: facts.sourceTitle, sourceDate: facts.sourceDate }, facts)
  assert.deepEqual(result, { publishable: true, issues: [] })
})
