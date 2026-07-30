import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

import { getNewsCategory, getNewsSourceLabel } from '../lib/content/news-presentation'

test('news without a publisher source is clearly presented as an original procurement guide', () => {
  assert.equal(getNewsCategory({ title: 'How to select a dump truck', category: null }), 'Procurement Guides')
  assert.equal(
    getNewsSourceLabel({ sourceUrl: null, sourceTitle: null }),
    'Original procurement guide prepared by SINOTRUK TEAM.'
  )
})

test('news from an enabled content source keeps the source attribution available to the page', () => {
  assert.equal(getNewsCategory({ title: 'Industry update', category: 'Industry Insights' }), 'Industry Insights')
  assert.equal(
    getNewsSourceLabel({ sourceUrl: 'https://source.example/article', sourceTitle: 'Source article' }),
    'Based on Source article.'
  )
})

test('news routes expose category filtering and source disclosure to readers', async () => {
  const indexSource = await readFile(new URL('../pages/news/index.tsx', import.meta.url), 'utf8')
  const articleSource = await readFile(new URL('../pages/news/[slug].tsx', import.meta.url), 'utf8')

  assert.match(indexSource, /Procurement Guides/)
  assert.match(articleSource, /Source information/)
})
