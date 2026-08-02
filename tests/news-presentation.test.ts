import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'

import { getNewsCategory, getNewsSourceLabel } from '../lib/content/news-presentation'
import NewsPage from '../pages/news'

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

test('news category links derive filtering from router query while default SSR keeps every article link', () => {
  const items = [
    { slug: 'manufacturer-story', title: 'Manufacturer update', date: '2026-07-01', image: '/images/news/banner-news.webp', excerpt: 'Factory update.', content: 'Body', seoTitle: 'Manufacturer update', seoDescription: 'Factory update.', category: 'Manufacturer News' },
    { slug: 'procurement-guide', title: 'How to select a truck', date: '2026-07-02', image: '/images/news/banner-news.webp', excerpt: 'Buying guide.', content: 'Body', seoTitle: 'Buying guide', seoDescription: 'Buying guide.', category: 'Procurement Guides' },
  ] as any
  const routerFor = (query: NextRouter['query']) => ({
    basePath: '', pathname: '/news', route: '/news', query, asPath: '/news',
    push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
    prefetch: async () => undefined, beforePopState: () => undefined,
    events: { on: () => undefined, off: () => undefined, emit: () => undefined },
    isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
  }) as NextRouter
  const render = (query: NextRouter['query']) => renderToStaticMarkup(createElement(RouterContext.Provider, { value: routerFor(query) }, createElement(NewsPage, { items })))
  const initial = render({})
  const filtered = render({ category: 'Procurement Guides' })

  assert.match(initial, /href="\/news\?category=Manufacturer(?:%20|\+)News"/)
  assert.match(initial, /href="\/news\/manufacturer-story"/)
  assert.match(initial, /href="\/news\/procurement-guide"/)
  assert.doesNotMatch(filtered, /href="\/news\/manufacturer-story"/)
  assert.match(filtered, /href="\/news\/procurement-guide"/)
})
