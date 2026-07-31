import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'

import NewsPage from '../pages/news'
import NewsDetailPage from '../pages/news/[slug]'
import type { NewsItem } from '../data/news'

const router = {
  basePath: '', pathname: '/news', route: '/news', query: {}, asPath: '/news',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter

const render = (element: React.ReactNode) => renderToStaticMarkup(createElement(RouterContext.Provider, { value: router }, element))
const item = (slug: string, source = true): NewsItem => ({
  slug,
  title: `Preparing a commercial truck RFQ ${slug}`,
  date: '2026-07-20',
  image: '/images/news/HOWO-TX-6x4-tractor5.webp',
  excerpt: 'A practical guide for preparing a commercial truck request.',
  content: 'Confirm the operating conditions before selecting a truck.\n\nRecord the required configuration in the enquiry.',
  seoTitle: `Commercial truck RFQ ${slug}`,
  seoDescription: 'Prepare a commercial truck request with the relevant operating conditions and configuration details.',
  category: 'Procurement Guides',
  sourceUrl: source ? 'https://publisher.example/truck-guide' : null,
  sourceTitle: source ? 'Publisher truck guide' : null,
  sourceDate: source ? '2026-07-19' : null,
})

const products = [{ id: 'howo-tx-6x4-dump-truck', name: 'Howo TX 6X4 Dump Truck', category: 'heavy-truck', subcategory: 'dump-truck', image: '/images/products/HOWO-TX-6X4.jpg' }]

test('news list uses one lead story and an asymmetric image-led editorial grid', () => {
  const markup = render(createElement(NewsPage, { items: [item('one'), item('two'), item('three'), item('four', false)] }))

  assert.equal((markup.match(/<h1\b/g) ?? []).length, 1)
  assert.match(markup, /aria-label="News editorial grid"/)
  assert.equal((markup.match(/>Lead story</g) ?? []).length, 1)
  assert.match(markup, /alt="Preparing a commercial truck RFQ one"/)
  assert.match(markup, /Source details are disclosed in the article\./)
})

test('article keeps cited-source disclosure and provides related articles and products', () => {
  const current = item('current')
  const markup = render(createElement(NewsDetailPage, { item: current, previous: null, next: null, related: [item('related')], relatedProducts: products }))

  assert.equal((markup.match(/<h1\b/g) ?? []).length, 1)
  assert.match(markup, /Source information/)
  assert.match(markup, /Based on Publisher truck guide\./)
  assert.match(markup, /href="https:\/\/publisher\.example\/truck-guide"/)
  assert.match(markup, /Related products/)
  assert.match(markup, /href="\/products\/heavy-truck\/dump-truck\/howo-tx-6x4-dump-truck"/)
  assert.match(markup, /Continue your research/)
})

test('article without a source URL is explicitly disclosed as an original procurement guide', () => {
  const markup = render(createElement(NewsDetailPage, { item: item('original', false), previous: null, next: null, related: [], relatedProducts: products }))

  assert.match(markup, /Original procurement guide prepared by SINOTRUK TEAM\./)
  assert.doesNotMatch(markup, /Open cited source/)
})
