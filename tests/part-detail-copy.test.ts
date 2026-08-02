import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { NextRouter } from 'next/router';
import { parts } from '../data/parts';
import PartDetailPage, { getStaticPaths, getStaticProps } from '../pages/parts/[part]';

const installDom = () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://www.sinotrukteam.com/parts/test-part' });
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

const routerForPart = (part: string) => ({
  basePath: '', pathname: '/parts/[part]', route: '/parts/[part]', query: { part }, asPath: `/parts/${part}`,
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
}) as NextRouter;

test('mounted part detail exposes the published part number and qualified compatibility guidance', async () => {
  const part = parts[0];
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);

  try {
    await act(async () => {
      root.render(createElement(RouterContext.Provider, { value: routerForPart(part.id) }, createElement(PartDetailPage)));
    });

    const main = container.querySelector('main');
    assert.ok(main);
    const visibleText = main.textContent?.replace(/\s+/g, ' ').trim() || '';
    assert.match(visibleText, new RegExp(part.partNumber));
    assert.match(visibleText, /Compatibility must be confirmed/);
    assert.match(visibleText, /truck model or VIN/);
    assert.doesNotMatch(visibleText, /guaranteed|fits all|fully compatible|compatible with every|no confirmation required/i);

    const links = Array.from(main.querySelectorAll('a')).map((link) => link.getAttribute('href'));
    assert.ok(links.includes('/parts'));
    assert.equal(links.filter((href) => href === `/contact?part=${encodeURIComponent(part.id)}`).length, 2);
    assert.match(main.querySelector(`img[alt*="${part.partNumber}"]`)?.getAttribute('class') || '', /object-contain/);
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});

test('part detail static routes include every unchanged part record', async () => {
  const result = await getStaticPaths();

  assert.equal(result.fallback, false);
  assert.deepEqual(result.paths, parts.map((part) => ({ params: { part: part.id } })));
  assert.deepEqual(await getStaticProps(), { props: {} });
});
