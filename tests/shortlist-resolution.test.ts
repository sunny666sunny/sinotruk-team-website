import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act, createElement, type ComponentType } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { NextRouter } from 'next/router';
import { allProducts } from '../data/products';
import { parts } from '../data/parts';
import { SHORTLIST_KEY } from '../lib/procurement/shortlist';
import { resolveShortlist } from '../lib/procurement/resolve-shortlist';

test('shortlist resolver keeps stored product and part order while skipping stale IDs', () => {
  const products = [{ id: 'truck-1', name: 'Truck' }];
  const partRecords = [{ id: 'part-1', name: 'Part' }];

  assert.deepEqual(resolveShortlist(['part-1', 'truck-1', 'missing'], products, partRecords), [partRecords[0], products[0]]);
});

const installDom = (path: string) => {
  const dom = new JSDOM('<div id="root"></div>', { url: `https://www.sinotrukteam.com${path}` });
  const values: Record<string, unknown> = {
    window: dom.window,
    self: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    HTMLElement: dom.window.HTMLElement,
    HTMLInputElement: dom.window.HTMLInputElement,
    HTMLTextAreaElement: dom.window.HTMLTextAreaElement,
    HTMLFormElement: dom.window.HTMLFormElement,
    Element: dom.window.Element,
    Node: dom.window.Node,
    Event: dom.window.Event,
    InputEvent: dom.window.InputEvent,
    MouseEvent: dom.window.MouseEvent,
    KeyboardEvent: dom.window.KeyboardEvent,
    CustomEvent: dom.window.CustomEvent,
    getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  const descriptors = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries(values)) {
    descriptors.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  return {
    window: dom.window,
    document: dom.window.document,
    restore() {
      dom.window.close();
      for (const [key, descriptor] of descriptors) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else Reflect.deleteProperty(globalThis, key);
      }
    },
  };
};

const routerFor = (pathname: string) => ({
  basePath: '', pathname, route: pathname, query: {}, asPath: pathname,
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
}) as NextRouter;

const renderPage = async (container: HTMLElement, router: NextRouter, page: ComponentType) => {
  const { createRoot } = await import('react-dom/client');
  const root = createRoot(container);
  await act(async () => {
    root.render(createElement(RouterContext.Provider, { value: router }, createElement(page)));
  });
  return root;
};

test('mounted shortlist resolves stored products and parts, saves removal, and links into RFQ', async () => {
  const product = allProducts[0];
  const part = parts[0];
  const dom = installDom('/shortlist');
  dom.window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify([part.id, product.id]));
  const container = dom.document.querySelector('#root') as HTMLElement;
  const { default: ShortlistPage } = await import('../pages/shortlist');
  const root = await renderPage(container, routerFor('/shortlist'), ShortlistPage);

  try {
    const articles = Array.from(container.querySelectorAll('main article'));
    assert.equal(articles.length, 2);
    assert.match(articles[0].textContent || '', new RegExp(part.partNumber));
    assert.match(articles[1].textContent || '', new RegExp(product.name));
    assert.equal(container.querySelector('main a[href="/contact"]')?.textContent?.replace(/\s+/g, ' ').trim(), 'Continue to RFQ');

    const removePart = container.querySelector(`[aria-label="Remove ${part.name} from shortlist"]`) as HTMLButtonElement;
    assert.ok(removePart);
    await act(async () => { removePart.click(); });

    assert.deepEqual(JSON.parse(dom.window.localStorage.getItem(SHORTLIST_KEY) || '[]'), [product.id]);
    assert.equal(container.querySelector(`[aria-label="Remove ${part.name} from shortlist"]`), null);
    assert.ok(container.querySelector(`[aria-label="Remove ${product.name} from shortlist"]`));
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});

test('mounted contact submits the complete existing RFQ payload to the contact API', async () => {
  const product = allProducts[0];
  const part = parts[0];
  const dom = installDom('/contact');
  dom.window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify([part.id, product.id, part.id]));
  const container = dom.document.querySelector('#root') as HTMLElement;
  const calls: Array<{ input: string | URL | Request; init?: RequestInit }> = [];
  const originalFetch = Object.getOwnPropertyDescriptor(globalThis, 'fetch');
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: async (input: string | URL | Request, init?: RequestInit) => {
      calls.push({ input, init });
      return { json: async () => ({ success: true }) } as Response;
    },
  });
  const { default: ContactPage } = await import('../pages/contact');
  const root = await renderPage(container, routerFor('/contact'), ContactPage);

  const setValue = async (name: string, value: string) => {
    const field = container.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement;
    assert.ok(field);
    const prototype = field instanceof dom.window.HTMLTextAreaElement ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
    await act(async () => {
      Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(field, value);
      field.dispatchEvent(new dom.window.InputEvent('input', { bubbles: true, data: value, inputType: 'insertText' }));
      field.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    });
  };

  try {
    assert.match(container.textContent || '', /Shortlist attached:\s*2 selected item\(s\)/);
    await setValue('name', 'Ada Buyer');
    await setValue('phone', '+254700000000');
    await setValue('email', 'ada@example.com');
    await setValue('country', 'Kenya');
    await setValue('quantity', '3');
    await setValue('useCase', 'Mining haulage');
    await setValue('destinationPort', 'Mombasa');
    await setValue('message', 'Confirm truck configuration and part compatibility.');
    await act(async () => { (container.querySelector('[name="consent"]') as HTMLInputElement).click(); });
    await act(async () => {
      (container.querySelector('form') as HTMLFormElement).dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].input, '/api/contact');
    assert.equal(calls[0].init?.method, 'POST');
    assert.equal(new Headers(calls[0].init?.headers).get('Content-Type'), 'application/json');
    assert.deepEqual(JSON.parse(calls[0].init?.body as string), {
      name: 'Ada Buyer',
      phone: '+254700000000',
      email: 'ada@example.com',
      country: 'Kenya',
      message: 'Confirm truck configuration and part compatibility.',
      selections: [part.id, product.id],
      quantity: '3',
      useCase: 'Mining haulage',
      destinationPort: 'Mombasa',
      consent: true,
    });
  } finally {
    await act(async () => { root.unmount(); });
    if (originalFetch) Object.defineProperty(globalThis, 'fetch', originalFetch);
    else Reflect.deleteProperty(globalThis, 'fetch');
    dom.restore();
  }
});
