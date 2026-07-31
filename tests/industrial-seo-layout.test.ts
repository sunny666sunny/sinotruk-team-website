import assert from 'node:assert/strict'
import test from 'node:test'
import { createRequire } from 'node:module'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'
import AboutPageLayout from '../components/about/AboutPageLayout'
import ServicePageLayout from '../components/service/ServicePageLayout'
import { SeoHead } from '../components/seo/SeoHead'
import { resolveSeo } from '../lib/seo/resolve'
import { absoluteUrl } from '../lib/seo/site-url'
import ProductsPage, { getStaticProps as getProductsStaticProps } from '../pages/products'
import { getStaticPaths as getProductStaticPaths } from '../pages/products/[category]/[subcategory]/[product]'

const router = {
  basePath: '', pathname: '/products', route: '/products', query: {}, asPath: '/products?drive=6x4',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter

function captureHead(element: React.ReactNode) {
  let head: any[] = []
  const manager = { mountedInstances: new Set(), updateHead: (next: any[]) => { head = next } }
  renderToStaticMarkup(createElement(RouterContext.Provider, { value: router }, createElement(HeadManagerContext.Provider, { value: manager }, element)))
  return head
}

test('homepage emits Organization, WebSite and WebPage schema', () => {
  const seo = resolveSeo({ path: '/', pageType: 'website', name: 'SINOTRUK TEAM' }, 'https://sinotrukteam.com')

  assert.deepEqual(seo.jsonLd.map((item) => item['@type']), ['Organization', 'WebSite', 'WebPage'])
})

test('catalogue schema contains only the supplied real product URLs', () => {
  const seo = resolveSeo({
    path: '/products/heavy-truck',
    pageType: 'collection',
    name: 'Heavy Truck',
    description: 'Published heavy truck models.',
    items: [
      { name: 'HOWO TX', url: '/products/heavy-truck/dump-truck/howo-tx' },
      { name: 'HOWO MAX', url: '/products/heavy-truck/tractor-truck/howo-max' },
    ],
  }, 'https://sinotrukteam.com')

  assert.equal(seo.jsonLd[0]['@type'], 'CollectionPage')
  assert.deepEqual(
    (seo.jsonLd[0].mainEntity as { itemListElement: Array<{ url: string }> }).itemListElement.map((item) => item.url),
    [
      'https://sinotrukteam.com/products/heavy-truck/dump-truck/howo-tx',
      'https://sinotrukteam.com/products/heavy-truck/tractor-truck/howo-max',
    ],
  )
})

test('published catalogue CollectionPage URLs equal the actual product static paths', async () => {
  const productProps = await getProductsStaticProps() as any
  const productPaths = await getProductStaticPaths({} as any) as any
  const head = captureHead(createElement(ProductsPage, productProps.props))
  const schemas = head.filter((item) => item.type === 'script' && item.props.type === 'application/ld+json').map((item) => JSON.parse(item.props.dangerouslySetInnerHTML.__html))
  const collection = schemas.find((item) => item['@type'] === 'CollectionPage')
  const collectionUrls = collection.mainEntity.itemListElement.map((item: { url: string }) => item.url).sort()
  const routeUrls = productPaths.paths.map(({ params }: any) => absoluteUrl(`/products/${params.category}/${params.subcategory}/${params.product}`)).sort()

  assert.deepEqual(collectionUrls, routeUrls)
})

test('product schema does not invent commercial or review fields', () => {
  const seo = resolveSeo({ path: '/products/heavy-truck/dump-truck/howo-tx', pageType: 'product', name: 'HOWO TX', description: 'Published product description.' }, 'https://sinotrukteam.com')
  const product = seo.jsonLd[0]

  assert.equal(product['@type'], 'Product')
  for (const field of ['offers', 'price', 'availability', 'aggregateRating', 'review']) assert.equal(field in product, false)
})

test('article schema retains supplied publication and source disclosure', () => {
  const seo = resolveSeo({
    path: '/news/export-guide',
    pageType: 'article',
    name: 'Export Guide | SINOTRUK',
    description: 'A source-grounded export guide.',
    datePublished: '2026-07-20',
    source: { title: 'Export Documentation Council', url: 'https://publisher.example/export-guide', datePublished: '2026-07-18' },
  }, 'https://sinotrukteam.com')
  const article = seo.jsonLd[0]

  assert.equal(article.datePublished, '2026-07-20')
  assert.deepEqual(article.citation, {
    '@type': 'CreativeWork',
    name: 'Export Documentation Council',
    url: 'https://publisher.example/export-guide',
    datePublished: '2026-07-18',
  })
  assert.equal(seo.title, 'Export Guide | SINOTRUK TEAM')
})

test('related links keep supplied routes, omit the current page and de-duplicate', async () => {
  const internalLinks = await import('../lib/seo/internal-links').catch(() => null)
  assert.ok(internalLinks, 'internal-link resolver should exist')

  assert.deepEqual(internalLinks.resolveRelatedLinks({
    currentPath: '/products/heavy-truck/dump-truck/howo-tx',
    candidates: [
      { label: 'Heavy trucks', href: '/products/heavy-truck' },
      { label: 'Current product', href: '/products/heavy-truck/dump-truck/howo-tx' },
      { label: 'Heavy trucks duplicate', href: '/products/heavy-truck' },
      { label: 'Parts catalogue', href: '/parts' },
      { label: 'External route', href: '//external.example/catalogue' },
    ],
  }), [
    { label: 'Heavy trucks', href: '/products/heavy-truck' },
    { label: 'Parts catalogue', href: '/parts' },
  ])
})

test('shared SEO head replaces the app canonical fallback with one keyed canonical', () => {
  const head = SeoHead({ input: { path: '/products', pageType: 'collection', name: 'Products' } }) as any
  const canonicals = head.props.children.filter((child: any) => child?.props?.rel === 'canonical') as any[]

  assert.equal(canonicals.length, 1)
  assert.equal(canonicals[0].key, 'canonical')
})

test('app fallback and page SEO resolve to one final canonical through Next head manager', async () => {
  const require = createRequire(import.meta.url)
  const extensions = (require as any).extensions
  const previousCssLoader = extensions['.css']
  extensions['.css'] = () => undefined
  let appModule: any
  try {
    appModule = await import('../pages/_app')
  } finally {
    if (previousCssLoader) extensions['.css'] = previousCssLoader
    else delete extensions['.css']
  }
  const App = (appModule.default as any).default || appModule.default
  const Page = () => createElement(SeoHead, { input: { path: '/products', pageType: 'collection', name: 'Products' } })
  const head = captureHead(createElement(App, { Component: Page, pageProps: {}, router } as any))
  const canonicals = head.filter((item) => item.type === 'link' && item.props.rel === 'canonical')

  assert.equal(canonicals.length, 1)
  assert.equal(canonicals[0].props.href, absoluteUrl('/products'))
})

test('social metadata falls back to a real site image without adding it to JSON-LD', () => {
  const seo = resolveSeo({ path: '/contact', pageType: 'website', name: 'Contact' }, 'https://sinotrukteam.com')

  assert.equal(seo.openGraph.image, 'https://sinotrukteam.com/images/products/Heavy-Truck.webp')
  assert.equal(seo.twitter.image, 'https://sinotrukteam.com/images/products/Heavy-Truck.webp')
  assert.equal('image' in seo.jsonLd[0], false)
})

test('shared public layouts give Next a single resolved title string', () => {
  const about = AboutPageLayout({ title: 'Our Facilities', description: 'Facilities.', children: null }) as any
  const service = ServicePageLayout({ title: 'After-sales Service', description: 'Support.', sections: [] }) as any

  assert.equal(about.props.children[0].props.children[0].props.children, 'Our Facilities | SINOTRUK TEAM')
  assert.equal(service.props.children[0].props.children[0].props.children, 'After-sales Service | SINOTRUK TEAM')
})

test('duplicate product records receive unique honest metadata', async () => {
  const { getStaticProps } = await import('../pages/products/[category]/[subcategory]/[product]')
  const first = await getStaticProps({ params: { product: 'sinotruck-howo-garbage-truck' } } as any) as any
  const second = await getStaticProps({ params: { product: 'sinotruck-howo-garbage-truck-2' } } as any) as any

  assert.notEqual(first.props.seoTitle, second.props.seoTitle)
  assert.notEqual(first.props.seoDescription, second.props.seoDescription)
  assert.match(first.props.seoTitle, /catalogue record 1 of 2/i)
  assert.match(second.props.seoTitle, /catalogue record 2 of 2/i)
})

test('products sharing source copy receive distinct readable descriptions', async () => {
  const { getStaticProps } = await import('../pages/products/[category]/[subcategory]/[product]')
  const fourByTwo = await getStaticProps({ params: { product: 'howo-4x2-tractor-truck' } } as any) as any
  const sixByFour = await getStaticProps({ params: { product: 'howo-6x4-tractor-truck' } } as any) as any

  assert.notEqual(fourByTwo.props.seoDescription, sixByFour.props.seoDescription)
  assert.match(fourByTwo.props.seoDescription, /^Howo 4X2 Tractor Truck:/)
  assert.match(sixByFour.props.seoDescription, /^Howo 6X4 Tractor Truck:/)
})
