import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { act, createElement, Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { NextRouter } from 'next/router';
import { CompareDialog } from '../components/industrial/catalogue/CompareDialog';
import { CatalogueToolbar } from '../components/industrial/catalogue/CatalogueToolbar';
import { IndustrialProductCard, toCatalogueProduct } from '../components/industrial/catalogue/IndustrialProductCard';
import PageHero from '../components/layout/PageHero';
import ProductFilters from '../components/procurement/ProductFilters';
import { SHORTLIST_KEY } from '../lib/procurement/shortlist';
import type { ProductFilterState } from '../lib/procurement/types';
import ProductsPage from '../pages/products';

const installDom = () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://www.sinotrukteam.com/products' });
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

const runtimeProduct = toCatalogueProduct({
  id: 'truck-1',
  name: 'Truck 1',
  category: 'heavy-truck',
  subcategory: 'dump-truck',
  description: 'Published description',
  image: '/images/products/truck.jpg',
  specifications: { 'Drive type': '6x4', 'Engine Power': '380 hp', Cab: 'HW76' },
});

test('product catalogue exposes the complete procurement toolbar and card actions', async () => {
  const [catalogue, toolbar, card] = await Promise.all([
    readFile(new URL('../pages/products/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/CatalogueToolbar.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/IndustrialProductCard.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(catalogue, /<CatalogueToolbar/);
  assert.match(catalogue, /<CompareDialog/);
  assert.match(catalogue, /<ProductFilters/);
  assert.match(catalogue, /<FilterDrawer/);
  assert.match(toolbar, /Showing \{count\} vehicles/);
  assert.match(toolbar, /aria-label="Sort products"/);
  assert.match(card, /Add to shortlist/);
  assert.match(card, /Compare/);
  assert.match(card, /Prepare RFQ/);
});

test('category catalogue routes keep every product visible through the shared procurement controls', async () => {
  const [category, subcategory, card, filters, hero] = await Promise.all([
    readFile(new URL('../pages/products/[category].tsx', import.meta.url), 'utf8'),
    readFile(new URL('../pages/products/[category]/[subcategory]/index.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/industrial/catalogue/IndustrialProductCard.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/procurement/ProductFilters.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/layout/PageHero.tsx', import.meta.url), 'utf8'),
  ]);

  for (const source of [category, subcategory]) {
    assert.match(source, /<PageHero/);
    assert.match(source, /<CatalogueToolbar/);
    assert.match(source, /<CompareDialog/);
    assert.match(source, /<ProductFilters/);
    assert.match(source, /<FilterDrawer/);
    assert.match(source, /useState<ProductFilterState>\(\{ drive: \[\], applications: \[\] \}\)/);
    assert.match(source, /visible\.map\(\(product\) =>/);
    assert.match(source, /<IndustrialProductCard/);
    assert.doesNotMatch(source, /<h1/);
  }
  assert.equal(hero.match(/<h1/g)?.length, 1);
  assert.match(card, /const href = `\/products\/\$\{product\.category\}\/\$\{product\.subcategory\}\/\$\{product\.id\}`/);
  assert.match(filters, /Clear all/);
});

test('catalogue view mapping only normalizes specifications that are actually published', () => {
  assert.equal(runtimeProduct.normalizedSpecs.drive, '6x4');
  assert.equal(runtimeProduct.normalizedSpecs.power, '380 hp');
  assert.deepEqual(runtimeProduct.applicationTags, []);
  assert.equal(runtimeProduct.normalizedSpecs.Cab, 'HW76');
});

test('rendered catalogue controls preserve product routes and dispatch procurement interactions', async () => {
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);
  let filtersOpened = 0;
  let selectedSort = '';
  let comparedId = '';
  let latestFilters: ProductFilterState = { drive: [], applications: [] };

  function Harness() {
    const [sort, setSort] = useState('featured');
    const [filters, setFilters] = useState<ProductFilterState>({ drive: [], applications: [] });
    return createElement('main', null,
      createElement(PageHero, { eyebrow: 'Products', title: 'Catalogue', description: 'Published vehicles.' }),
      createElement(CatalogueToolbar, {
        count: 1,
        onOpenFilters: () => { filtersOpened += 1; },
        sort,
        onSort: (value) => { selectedSort = value; setSort(value); },
      }),
      createElement(ProductFilters, {
        drives: ['6x4'],
        applications: ['mining'],
        value: filters,
        onChange: (value) => { latestFilters = value; setFilters(value); },
      }),
      createElement(IndustrialProductCard, {
        product: runtimeProduct,
        onCompareChange: (id) => { comparedId = id; },
      }),
    );
  }

  try {
    await act(async () => { root.render(createElement(Harness)); });
    assert.equal(container.querySelectorAll('h1').length, 1);
    assert.equal(container.querySelector('article a')?.getAttribute('href'), '/products/heavy-truck/dump-truck/truck-1');

    await act(async () => { (container.querySelector('[aria-label="Open product filters"]') as HTMLButtonElement).click(); });
    assert.equal(filtersOpened, 1);

    const sort = container.querySelector('[aria-label="Sort products"]') as HTMLSelectElement;
    sort.value = 'name-desc';
    await act(async () => { sort.dispatchEvent(new dom.document.defaultView!.Event('change', { bubbles: true })); });
    assert.equal(selectedSort, 'name-desc');

    await act(async () => { (container.querySelector('input[type="checkbox"]') as HTMLInputElement).click(); });
    assert.deepEqual(latestFilters.drive, ['6x4']);
    await act(async () => { (container.querySelector('aside button') as HTMLButtonElement).click(); });
    assert.deepEqual(latestFilters, { drive: [], applications: [] });

    const shortlist = container.querySelector('[aria-label="Add Truck 1 to shortlist"]') as HTMLButtonElement;
    await act(async () => { shortlist.click(); });
    assert.deepEqual(JSON.parse(dom.document.defaultView!.localStorage.getItem(SHORTLIST_KEY) || '[]'), ['truck-1']);

    await act(async () => { (container.querySelector('[aria-label="Compare Truck 1"]') as HTMLButtonElement).click(); });
    assert.equal(comparedId, 'truck-1');
    assert.equal(container.querySelector('[aria-label="Prepare RFQ for Truck 1"]')?.getAttribute('href'), '/contact?product=truck-1');
    assert.equal(container.querySelector('article h3')?.textContent, 'Truck 1');
    assert.equal(container.querySelector('article h2'), null);
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});

test('compare dialog traps focus, closes on Escape, restores focus and unlocks scrolling', async () => {
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);

  function Harness() {
    const [open, setOpen] = useState(false);
    return createElement(Fragment, null,
      createElement('button', { id: 'compare-trigger', type: 'button', onClick: () => setOpen(true) }, 'Open comparison'),
      createElement(CompareDialog, { open, onClose: () => setOpen(false), products: [runtimeProduct] }),
    );
  }

  try {
    await act(async () => { root.render(createElement(Harness)); });
    const trigger = container.querySelector('#compare-trigger') as HTMLButtonElement;
    trigger.focus();
    dom.document.body.style.overflow = 'auto';
    await act(async () => { trigger.click(); });

    const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
    const close = container.querySelector('[aria-label="Close vehicle comparison"]') as HTMLButtonElement;
    assert.equal(dom.document.activeElement, close);
    assert.equal(dom.document.body.style.overflow, 'hidden');

    const tabEvent = new dom.document.defaultView!.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    await act(async () => { close.dispatchEvent(tabEvent); });
    assert.equal(tabEvent.defaultPrevented, true);
    assert.equal(dom.document.activeElement, close);

    const escapeEvent = new dom.document.defaultView!.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    await act(async () => { dialog.dispatchEvent(escapeEvent); });
    assert.equal(container.querySelector('[role="dialog"]'), null);
    assert.equal(dom.document.body.style.overflow, 'auto');
    assert.equal(dom.document.activeElement, trigger);
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});

test('real products page integrates catalogue routing and procurement interactions', async () => {
  const dom = installDom();
  const container = dom.document.querySelector('#root') as HTMLElement;
  const root = createRoot(container);
  const zuluTruck = { ...runtimeProduct, id: 'zulu-truck', name: 'Zulu Truck', applicationTags: ['mining'] };
  const alphaTruck = {
    ...runtimeProduct,
    id: 'alpha-truck',
    name: 'Alpha Truck',
    normalizedSpecs: { ...runtimeProduct.normalizedSpecs, drive: '8x4', power: '420 hp' },
    applicationTags: ['logistics'],
  };

  function PageHarness() {
    const [query, setQuery] = useState<NextRouter['query']>({});
    const push: NextRouter['push'] = async (url) => {
      if (typeof url !== 'string') setQuery(url.query || {});
      return true;
    };
    const router = {
      basePath: '',
      pathname: '/products',
      route: '/products',
      query,
      asPath: '/products',
      push,
      replace: async () => true,
      reload: () => undefined,
      back: () => undefined,
      forward: () => undefined,
      prefetch: async () => undefined,
      beforePopState: () => undefined,
      events: { on: () => undefined, off: () => undefined, emit: () => undefined },
      isFallback: false,
      isLocaleDomain: false,
      isReady: true,
      isPreview: false,
    } as NextRouter;
    return createElement(
      RouterContext.Provider,
      { value: router },
      createElement(ProductsPage, { products: [zuluTruck, alphaTruck] }),
    );
  }

  try {
    await act(async () => { root.render(createElement(PageHarness)); });
    assert.equal(container.querySelectorAll('main h1').length, 1);
    assert.equal(container.querySelector('[aria-live="polite"]')?.textContent?.replace(/\s+/g, ' ').trim(), 'Showing 2 vehicles');
    assert.ok(container.querySelector('a[href="/products/heavy-truck/dump-truck/zulu-truck"]'));
    assert.ok(container.querySelector('a[href="/products/heavy-truck/dump-truck/alpha-truck"]'));

    const sort = container.querySelector('[aria-label="Sort products"]') as HTMLSelectElement;
    sort.value = 'name-asc';
    await act(async () => { sort.dispatchEvent(new dom.document.defaultView!.Event('change', { bubbles: true })); });
    assert.deepEqual(
      Array.from(container.querySelectorAll('main article h3')).map((heading) => heading.textContent),
      ['Alpha Truck', 'Zulu Truck'],
    );

    await act(async () => { (container.querySelector('aside input[type="checkbox"]') as HTMLInputElement).click(); });
    assert.equal(container.querySelector('[aria-live="polite"]')?.textContent?.replace(/\s+/g, ' ').trim(), 'Showing 1 vehicles');
    assert.ok(container.querySelector('a[href="/products/heavy-truck/dump-truck/zulu-truck"]'));
    assert.equal(container.querySelector('a[href="/products/heavy-truck/dump-truck/alpha-truck"]'), null);

    await act(async () => { (container.querySelector('[aria-label="Add Zulu Truck to shortlist"]') as HTMLButtonElement).click(); });
    assert.deepEqual(JSON.parse(dom.document.defaultView!.localStorage.getItem(SHORTLIST_KEY) || '[]'), ['zulu-truck']);

    await act(async () => { (container.querySelector('[aria-label="Compare Zulu Truck"]') as HTMLButtonElement).click(); });
    const openComparison = Array.from(container.querySelectorAll('button')).find((button) => button.textContent?.trim() === 'Compare');
    assert.ok(openComparison);
    await act(async () => { openComparison.click(); });
    const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
    assert.ok(dialog);
    await act(async () => {
      dialog.dispatchEvent(new dom.document.defaultView!.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    });
    assert.equal(container.querySelector('[role="dialog"]'), null);
  } finally {
    await act(async () => { root.unmount(); });
    dom.restore();
  }
});
