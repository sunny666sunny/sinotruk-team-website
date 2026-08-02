import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import { resolveSeo } from '../lib/seo/resolve'
import ProductDetailPage from '../pages/products/[category]/[subcategory]/[product]'
import { allProducts } from '../data/products'

test('询价型产品结构化数据包含真实参数、图片说明和可见 FAQ', () => {
  const seo = resolveSeo({
    path: '/products/heavy-truck/cargo-truck/howo-6x4-cargo-truck',
    pageType: 'product',
    name: 'Howo 6X4 Cargo Truck',
    description: 'Published cargo truck configuration for export review.',
    image: '/truck.webp',
    productId: 'howo-6x4-cargo-truck',
    category: 'Heavy Truck / Cargo Truck',
    productImages: [
      { url: '/truck.webp', caption: 'Howo 6X4 Cargo Truck published front view' },
      { url: '/truck-side.webp', caption: 'Howo 6X4 Cargo Truck published side view' },
    ],
    additionalProperties: [
      { name: 'Drive type', value: '6x4' },
      { name: 'Power', value: '266-430PS' },
    ],
    faqs: [
      { question: 'What drive type is published?', answer: 'The published drive type is 6x4.' },
      { question: 'What is needed for an RFQ?', answer: 'Provide route, cargo and destination details.' },
      { question: 'How are parts identified?', answer: 'Provide the product reference and VIN when available.' },
      { question: 'Are configurations market-specific?', answer: 'Final configuration is confirmed for the destination.' },
    ],
  }, 'https://www.sinotrukteam.com')

  const product = seo.jsonLd.find((item) => item['@type'] === 'Product')!
  const faq = seo.jsonLd.find((item) => item['@type'] === 'FAQPage')!
  assert.equal(product.sku, 'howo-6x4-cargo-truck')
  assert.equal(product.category, 'Heavy Truck / Cargo Truck')
  assert.deepEqual(product.additionalProperty, [
    { '@type': 'PropertyValue', name: 'Drive type', value: '6x4' },
    { '@type': 'PropertyValue', name: 'Power', value: '266-430PS' },
  ])
  assert.equal((product.image as unknown[]).length, 2)
  assert.equal((product.image as Array<Record<string, unknown>>)[1].caption, 'Howo 6X4 Cargo Truck published side view')
  assert.equal((faq.mainEntity as unknown[]).length, 4)
  assert.doesNotMatch(JSON.stringify(seo.jsonLd), /"(?:offers|aggregateRating|review)":/i)
})

test('真实产品页把可见 FAQ、图片和参数接入 SeoHead', () => {
  const product = allProducts.find((item) => item.id === 'howo-6x4-cargo-truck')!
  let head: any[] = []
  const manager = { mountedInstances: new Set(), updateHead: (items: any[]) => { head = items } }
  const router = { basePath: '', pathname: '/', route: '/', query: {}, asPath: '/', push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined, prefetch: async () => undefined, beforePopState: () => undefined, events: { on: () => undefined, off: () => undefined, emit: () => undefined }, isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false } as any
  renderToStaticMarkup(React.createElement(RouterContext.Provider, { value: router }, React.createElement(HeadManagerContext.Provider, { value: manager }, React.createElement(ProductDetailPage, { product: product as any, seoTitle: 'Howo 6X4 Cargo Truck | SINOTRUK TEAM', seoDescription: product.description }))))
  const schemas = head.filter((item) => item.type === 'script').map((item) => JSON.parse(item.props.dangerouslySetInnerHTML.__html))
  const schemaProduct = schemas.find((item) => item['@type'] === 'Product')

  assert.ok(schemas.some((item) => item['@type'] === 'FAQPage'))
  assert.equal(schemaProduct.sku, product.id)
  assert.ok(Array.isArray(schemaProduct.image) && schemaProduct.image.length >= 3)
  assert.ok(Array.isArray(schemaProduct.additionalProperty) && schemaProduct.additionalProperty.length >= 5)
})
