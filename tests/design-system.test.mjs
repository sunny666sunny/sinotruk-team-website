import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import focusTrap from '../lib/ui/focus-trap.js';

const { activateDrawer, getFocusableElements, handleDrawerKeyDown, trapFocus } = focusTrap;

test('采购设计令牌使用已确认的精确颜色与反馈值', async () => {
  const css = await readFile(new URL('../styles/tokens.css', import.meta.url), 'utf8');

  for (const [token, value] of Object.entries({
    '--color-ink': '#17282c',
    '--color-steel': '#4a625f',
    '--color-canvas': '#e8eeef',
    '--color-panel': '#f8fafa',
    '--color-line': 'rgb(23 40 44 / 12%)',
    '--color-signal': '#16a39d',
    '--color-signal-dark': '#0b7479',
    '--space-3': '.75rem',
    '--radius-panel': '.375rem',
  })) {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(css, new RegExp(`${token}\\s*:\\s*${escapedValue}`));
  }

  assert.match(css, /--shadow-focus:\s*0 0 0 3px rgb\(22 163 157 \/ 24%\)/);
  assert.match(css, /120ms/);
  assert.match(css, /200ms/);
});

test('焦点陷阱跳过隐藏控件并在首尾控件之间循环', () => {
  const dom = new JSDOM(`
    <div id="drawer">
      <button id="first">First</button>
      <input id="hidden-input" type="hidden" />
      <button id="aria-hidden" aria-hidden="true">Hidden</button>
      <button id="last">Last</button>
    </div>
  `);
  const drawer = dom.window.document.querySelector('#drawer');
  const first = dom.window.document.querySelector('#first');
  const last = dom.window.document.querySelector('#last');

  assert.deepEqual(getFocusableElements(drawer).map((element) => element.id), ['first', 'last']);

  let prevented = false;
  trapFocus({ key: 'Tab', shiftKey: false, target: last, preventDefault: () => { prevented = true; } }, drawer);
  assert.equal(prevented, true);
  assert.equal(dom.window.document.activeElement, first);

  prevented = false;
  trapFocus({ key: 'Tab', shiftKey: true, target: first, preventDefault: () => { prevented = true; } }, drawer);
  assert.equal(prevented, true);
  assert.equal(dom.window.document.activeElement, last);
});

test('抽屉激活、Escape 关闭和清理会恢复焦点及页面滚动', () => {
  const dom = new JSDOM(`
    <button id="trigger">Open</button>
    <div id="drawer" tabindex="-1"><button id="inside">Inside</button></div>
  `);
  const { document } = dom.window;
  const trigger = document.querySelector('#trigger');
  const drawer = document.querySelector('#drawer');
  const inside = document.querySelector('#inside');
  trigger.focus();
  document.body.style.overflow = 'auto';

  const deactivate = activateDrawer(drawer, document);
  assert.equal(document.activeElement, inside);
  assert.equal(document.body.style.overflow, 'hidden');

  let closed = 0;
  let prevented = false;
  handleDrawerKeyDown({ key: 'Escape', preventDefault: () => { prevented = true; } }, drawer, () => { closed += 1; });
  assert.equal(closed, 1);
  assert.equal(prevented, true);

  deactivate();
  assert.equal(document.body.style.overflow, 'auto');
  assert.equal(document.activeElement, trigger);
});
