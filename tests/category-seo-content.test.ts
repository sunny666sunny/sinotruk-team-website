import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'
import { productCategories } from '../data/siteConfig'
import ProductCategoryPage, { getStaticProps } from '../pages/products/[category]'

const router = {
  basePath: '', pathname: '/products/[category]', route: '/products/[category]', query: {}, asPath: '/products/heavy-truck',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter

test('six category records expose original fact-bound SEO content', () => {
  assert.equal(productCategories.length, 6)
  for (const category of productCategories) {
    assert.ok(category.seoTitle.length >= 35 && category.seoTitle.length <= 70, category.id)
    assert.ok(category.seoDescription.length >= 120 && category.seoDescription.length <= 165, category.id)
    assert.ok(category.categoryDescription.length >= 90, category.id)
    assert.equal(category.contentSections.length, 3, category.id)
    assert.ok(category.contentSections.every((section) => section.title.length >= 12 && section.body.length >= 120), category.id)
  }
  assert.doesNotMatch(
    JSON.stringify(productCategories),
    /leading brand|pioneer|concrete transportation|high-capacity trailers|liquids and gases|world-class refitting|biggest heavy truck manufacturer/i,
  )
})

test('six category pages server-render unique metadata, guides and real subcategory links', async () => {
  const titles = new Set<string>()
  const descriptions = new Set<string>()

  for (const sourceCategory of productCategories) {
    const result = await getStaticProps({ params: { category: sourceCategory.id } }) as any
    let head: any[] = []
    const manager = { mountedInstances: new Set(), updateHead: (items: any[]) => { head = items } }
    const html = renderToStaticMarkup(
      createElement(RouterContext.Provider, { value: { ...router, asPath: `/products/${sourceCategory.id}` } },
        createElement(HeadManagerContext.Provider, { value: manager },
          createElement(ProductCategoryPage, result.props),
        ),
      ),
    )

    const title = head.find((item) => item.type === 'title')?.props.children as string
    const description = head.find((item) => item.type === 'meta' && item.props.name === 'description')?.props.content as string
    titles.add(title)
    descriptions.add(description)
    assert.equal((html.match(/<h1/g) || []).length, 1, sourceCategory.id)
    assert.match(html, /Category procurement guide/)
    assert.match(html, new RegExp(sourceCategory.fullDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    for (const section of sourceCategory.contentSections) assert.match(html, new RegExp(section.title))
    for (const subcategory of sourceCategory.subcategories) {
      assert.match(html, new RegExp(`/products/${sourceCategory.id}/${subcategory.id}`))
    }
  }

  assert.equal(titles.size, 6)
  assert.equal(descriptions.size, 6)
})
