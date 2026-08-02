import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'
import { CatalogueMatrix } from '@/components/industrial/home/CatalogueMatrix'
import { productCategories } from '@/data/siteConfig'

test('approved prototype is removed after production promotion', () => {
  assert.equal(existsSync('pages/prototype/industrial-home.tsx'), false)
  assert.equal(existsSync('styles/industrial-home-prototype.module.css'), false)
})

test('industrial public theme is loaded without changing catalogue records', () => {
  const app = readFileSync('pages/_app.tsx', 'utf8')
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')
  const integrityTests = readFileSync('tests/catalog-integrity.test.ts', 'utf8')

  assert.match(app, /industrial-theme\.css/)
  assert.match(theme, /--industrial-accent:\s*#20aaa4/i)
  assert.match(integrityTests, /compareCatalogSnapshots/)
  assert.match(integrityTests, /createCatalogSnapshot/)
})

test('public app SSR emits the industrial theme root while admin SSR does not need a hydration effect', async () => {
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
  const Page = () => createElement('main', null, 'Rendered page')
  const routerFor = (pathname: string) => ({
    basePath: '', pathname, route: pathname, query: {}, asPath: pathname,
    push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
    prefetch: async () => undefined, beforePopState: () => undefined,
    events: { on: () => undefined, off: () => undefined, emit: () => undefined },
    isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
  }) as NextRouter
  const renderApp = (router: NextRouter) => renderToString(createElement(
    RouterContext.Provider,
    { value: router },
    createElement(App, { Component: Page, pageProps: {}, router } as any),
  ))

  assert.match(renderApp(routerFor('/products')), /class="industrial-site"/)
  assert.doesNotMatch(renderApp(routerFor('/admin/products')), /industrial-site/)
  assert.doesNotMatch(readFileSync('pages/_app.tsx', 'utf8'), /useEffect/)
})

test('catalogue matrix renders all six category links in a five-column desktop grid', () => {
  const markup = renderToStaticMarkup(createElement(CatalogueMatrix, { categories: productCategories }))
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')

  assert.equal((markup.match(/href="\/products\//g) ?? []).length, 6)
  assert.match(markup, /industrial-home-catalogue-grid/)
  assert.match(theme, /grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/)
})

test('catalogue matrix sizes featured cards by category identity rather than input order', () => {
  const reordered = [...productCategories.slice(2), ...productCategories.slice(0, 2)]
  const markup = renderToStaticMarkup(createElement(CatalogueMatrix, { categories: reordered }))
  const heavyTruck = markup.match(/<a[^>]*class="([^"]*)"[^>]*href="\/products\/heavy-truck"/)?.[1]
  const lightTruck = markup.match(/<a[^>]*class="([^"]*)"[^>]*href="\/products\/light-truck"/)?.[1]

  assert.match(heavyTruck ?? '', /industrial-home-category-primary/)
  assert.match(lightTruck ?? '', /industrial-home-category-wide/)
})

test('public accessibility and responsive preflight contracts stay enabled', () => {
  const header = readFileSync('components/industrial/IndustrialHeader.tsx', 'utf8')
  const productDetailPage = readFileSync('pages/products/[category]/[subcategory]/[product].tsx', 'utf8')
  const homeSections = readFileSync('components/industrial/home/HomeSections.tsx', 'utf8')
  const pageHero = readFileSync('components/layout/PageHero.tsx', 'utf8')
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')
  const publicSources = [header, productDetailPage, homeSections, pageHero, theme].join('\n')

  assert.match(header, /href=["']#main["']/)
  assert.equal((productDetailPage.match(/<main\s+id=["']main["']/g) ?? []).length, 2)
  assert.match(theme, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  assert.doesNotMatch(publicSources, /(?:^|\s)h-screen(?:\s|["'])/)
  assert.doesNotMatch(publicSources, /overflow-x-hidden/)
  assert.doesNotMatch(pageHero, /<img\b/)
  assert.match(pageHero, /sizes=["']100vw["']/)
  assert.doesNotMatch(homeSections, /<span\s+className=["']industrial-home-article-copy["'][^>]*>[\s\S]*?<h3>/)
  assert.equal((homeSections.match(/Request quote/g) ?? []).length, 1)
  assert.match(theme, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.industrial-home-catalogue-grid\s*{[\s\S]*?grid-template-columns:\s*1fr/)
})

test('public legacy sections use responsive images and prioritize only the active hero slide', () => {
  const about = readFileSync('components/home/AboutSection.tsx', 'utf8')
  const hero = readFileSync('components/home/HeroBanner.tsx', 'utf8')

  assert.doesNotMatch(`${about}\n${hero}`, /<img\b/)
  assert.match(hero, /priority=\{index\s*===\s*activeSlide\}/)
  assert.match(hero, /sizes=["']100vw["']/)
})
