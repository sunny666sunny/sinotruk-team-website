import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import ProductDetail from '../components/product/ProductDetail';
import type { Product } from '../data/products';
import { SHORTLIST_KEY } from '../lib/procurement/shortlist';

const installDom = () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://www.sinotrukteam.com/products/heavy-truck/dump-truck/qa-truck' });
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

const product: Product = {
  id: 'qa-truck',
  name: 'QA Truck',
  category: 'heavy-truck',
  subcategory: 'dump-truck',
  description: 'Published test description.',
  image: '/images/products/qa-main.jpg',
  bannerImage: '/images/products/qa-banner.jpg',
  galleryImages: [
    '/images/products/qa-gallery-a.jpg',
    '/images/products/qa-main.jpg',
    '/images/products/qa-gallery-b.jpg',
    '/images/products/qa-gallery-a.jpg',
  ],
  specifications: {
    Engine: 'Raw 380/371 hp',
    'Drive type': '6x4',
    Payload: '30 t',
  },
  detailedFeatures: {
    Engine: 'Conflicting 420 hp',
  },
};

const publishedPath = (image: HTMLImageElement) => {
  const src = new URL(image.getAttribute('src') || '', 'https://www.sinotrukteam.com');
  return src.searchParams.get('url') || src.pathname;
};

test('rendered product detail keeps every unique published image path and wires procurement actions', async () => {
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);

  try {
    await act(async () => { root.render(createElement(ProductDetail, { product })); });

    const gallery = container.querySelector('[aria-label="QA Truck gallery"]') as HTMLElement;
    assert.ok(gallery);
    assert.deepEqual(
      Array.from(gallery.querySelectorAll('img')).map(publishedPath),
      [
        '/images/products/qa-main.jpg',
        '/images/products/qa-banner.jpg',
        '/images/products/qa-gallery-a.jpg',
        '/images/products/qa-gallery-b.jpg',
      ],
    );

    const shortlist = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.includes('Add to shortlist'));
    assert.ok(shortlist);
    await act(async () => { shortlist.click(); });
    assert.deepEqual(JSON.parse(dom.document.defaultView!.localStorage.getItem(SHORTLIST_KEY) || '[]'), ['qa-truck']);
    assert.match(shortlist.textContent || '', /Shortlisted/);
    assert.equal(shortlist.disabled, true);

    const compare = Array.from(container.querySelectorAll('a')).find((link) => link.textContent?.trim() === 'Compare');
    const rfq = Array.from(container.querySelectorAll('a')).find((link) => link.textContent?.trim() === 'Prepare RFQ');
    assert.equal(compare?.getAttribute('href'), '/products');
    assert.equal(rfq?.getAttribute('href'), '/contact?product=qa-truck');
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});

test('rendered product detail preserves raw grouped values and marks missing or conflicting source data', async () => {
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);

  try {
    await act(async () => { root.render(createElement(ProductDetail, { product })); });

    const headings = Array.from(container.querySelectorAll('h3')).map((heading) => heading.textContent);
    for (const heading of ['Powertrain', 'Chassis', 'Dimensions', 'Capacity']) assert.ok(headings.includes(heading));
    assert.match(container.textContent || '', /Raw 380\/371 hp/);
    assert.match(container.textContent || '', /Not published/);
    assert.match(container.textContent || '', /require data review/);
    assert.doesNotMatch(container.textContent || '', /Conflicting 420 hp/);
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});
