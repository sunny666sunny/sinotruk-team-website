import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { JSDOM } from 'jsdom'
import { act, createElement, Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'
import { IndustrialHeader } from '../components/industrial/IndustrialHeader'

const installDom = () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://www.sinotrukteam.com/products' })
  const values: Record<string, unknown> = {
    window: dom.window,
    self: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    HTMLElement: dom.window.HTMLElement,
    Element: dom.window.Element,
    Node: dom.window.Node,
    Event: dom.window.Event,
    MouseEvent: dom.window.MouseEvent,
    KeyboardEvent: dom.window.KeyboardEvent,
    getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
    IS_REACT_ACT_ENVIRONMENT: true,
  }
  const descriptors = new Map<string, PropertyDescriptor | undefined>()
  for (const [key, value] of Object.entries(values)) {
    descriptors.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  }
  return {
    document: dom.window.document,
    restore() {
      dom.window.close()
      for (const [key, descriptor] of descriptors) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else Reflect.deleteProperty(globalThis, key)
      }
    },
  }
}

const router = {
  basePath: '', pathname: '/products', route: '/products', query: {}, asPath: '/products',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter

test('industrial product navigation exposes all six catalogue families', () => {
  const source = readFileSync('components/industrial/IndustrialHeader.tsx', 'utf8')

  for (const id of ['heavy-truck', 'light-truck', 'special-vehicle', 'light-vehicle', 'semi-trailer', 'new-energy-vehicle']) {
    assert.match(source, new RegExp(`/products/\\$\\{category\\.id\\}|${id}`))
  }

  assert.match(source, /productCategories\.map/)
  assert.match(source, /aria-expanded/)
  assert.match(source, /Escape/)
  assert.match(source, /Request Quote/)
})

test('public header remains a thin industrial shell wrapper', () => {
  const source = readFileSync('components/layout/Header.tsx', 'utf8')

  assert.match(source, /<IndustrialHeader \{\.\.\.props\} \/>/)
})

test('mounted public header keeps skip, 44px navigation targets and drawer behavior', async () => {
  const dom = installDom()
  const container = dom.document.querySelector('#root') as HTMLElement
  const root = createRoot(container)

  try {
    await act(async () => {
      root.render(createElement(RouterContext.Provider, { value: router }, createElement(Fragment, null,
        createElement(IndustrialHeader),
        createElement('main', { id: 'main' }),
      )))
    })

    const skip = container.querySelector('a[href="#main"]') as HTMLAnchorElement
    assert.ok(skip)
    assert.equal(skip.hash, '#main')
    assert.equal(container.querySelectorAll('main#main').length, 1)

    const logo = container.querySelector('a[aria-label="SINOTRUK TEAM home"]') as HTMLAnchorElement
    assert.match(logo.className, /\bmin-h-11\b/)
    assert.match(logo.className, /\bmin-w-11\b/)

    const category = container.querySelector('a[href="/products/heavy-truck"]') as HTMLAnchorElement
    const subcategory = container.querySelector('a[href="/products/heavy-truck/dump-truck"]') as HTMLAnchorElement
    assert.match(category.className, /\bmin-h-11\b/)
    assert.match(subcategory.className, /\bmin-h-11\b/)

    const open = container.querySelector('button[aria-label="Open navigation"]') as HTMLButtonElement
    await act(async () => { open.click() })
    assert.equal(open.getAttribute('aria-expanded'), 'true')
    const drawer = container.querySelector('[role="dialog"][aria-label="Site navigation"]') as HTMLElement
    assert.ok(drawer)
    assert.equal(dom.document.body.style.overflow, 'hidden')
    assert.equal(drawer.querySelectorAll('a:not([class*="min-h-11"]):not([class*="min-h-12"])').length, 0)

    await act(async () => {
      drawer.dispatchEvent(new dom.document.defaultView!.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    })
    assert.equal(container.querySelector('[role="dialog"]'), null)
    assert.equal(dom.document.body.style.overflow, '')
  } finally {
    await act(async () => { root.unmount() })
    dom.restore()
  }
})
