import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { act } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { Window } from 'happy-dom'

import ProductDetail from '../components/product/ProductDetail'
import { allProducts } from '../data/products'
import { ProductMediaPanel } from '../components/industrial/catalogue/ProductMediaPanel'

test('产品画廊使用深色无留白舞台并完整展示图片', () => {
  const images = [
    { image: '/one.webp', alt: 'Truck view one', title: 'View one', description: 'First view.' },
    { image: '/two.webp', alt: 'Truck view two', title: 'View two', description: 'Second view.' },
  ]
  const html = renderToStaticMarkup(React.createElement(ProductMediaPanel, { images, name: 'Truck' }))

  assert.match(html, /bg-\[#081113\]/)
  assert.equal((html.match(/object-contain/g) || []).length, images.length + 1)
  assert.doesNotMatch(html, /#F3F5F2|#edf1ef|#cdd5d2|object-contain p-2/)
})

test('产品详情服务端 HTML 包含完整图文决策路径和独立 FAQ', () => {
  const product = allProducts.find((item) => item.id === 'howo-6x4-cargo-truck')!
  const html = renderToStaticMarkup(React.createElement(ProductDetail, { product }))

  for (const heading of ['Performance', 'Product gallery', 'SINOTRUK Application Areas', 'SINOTRUK Solutions', 'SINOTRUK Customer Service', 'Frequently Asked Questions']) {
    assert.match(html, new RegExp(`>${heading}<`, 'i'), heading)
  }
  assert.equal((html.match(/<details/g) || []).length, 5)
  assert.match(html, /<figure/)
  assert.match(html, /<figcaption/)
  assert.match(html, /What drive and power options are published for the Howo 6X4 Cargo Truck\?/)
  assert.doesNotMatch(html, /mailto:|support@|parts@|service@|training@/i)
  assert.match(html, /not a universal manufacturer service or warranty statement/i)
  assert.doesNotMatch(html, /24\/7|fast delivery|authorized dealer|financing options|operator certification/i)
})

test('画廊缩略图切换主图和可见说明', async () => {
  const window = new Window({ url: 'https://example.com/product' })
  window.document.body.innerHTML = '<div id="root"></div>'
  Object.defineProperty(window.HTMLImageElement.prototype, 'height', { configurable: true, get: () => 100 })
  Object.defineProperty(window.HTMLImageElement.prototype, 'width', { configurable: true, get: () => 160 })
  const computedStyle = window.getComputedStyle.bind(window)
  window.getComputedStyle = ((element: Element) => {
    const style = computedStyle(element)
    Object.defineProperty(style, 'position', { configurable: true, value: 'relative' })
    Object.defineProperty(style, 'height', { configurable: true, value: '100px' })
    return style
  }) as typeof window.getComputedStyle
  const previous = { window: globalThis.window, document: globalThis.document, IS_REACT_ACT_ENVIRONMENT: (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT }
  Object.assign(globalThis, { window, document: window.document, IS_REACT_ACT_ENVIRONMENT: true })
  const container = window.document.querySelector('#root') as HTMLElement
  const root = createRoot(container)
  const images = [
    { image: '/one.webp', alt: 'Truck view one', title: 'View one', description: 'First view.' },
    { image: '/two.webp', alt: 'Truck view two', title: 'View two', description: 'Second view.' },
  ]
  try {
    await act(async () => root.render(React.createElement(ProductMediaPanel, { images, name: 'Truck' })))
    await act(async () => (container.querySelectorAll('button')[1] as HTMLButtonElement).click())
    assert.match(container.querySelector('figcaption')?.textContent || '', /View two.*Second view\./)
  } finally {
    await act(async () => root.unmount())
    await window.close()
    Object.assign(globalThis, previous)
  }
})
