import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { PartImageStage } from '../components/parts/PartImageStage'

test('配件摄影台使用冷白底并完整展示白底产品图', () => {
  const html = renderToStaticMarkup(React.createElement(PartImageStage, { src: '/part.webp', alt: 'Test part', priority: true }))
  assert.match(html, /bg-\[#F3F5F2\]/)
  assert.match(html, /object-contain/)
  assert.doesNotMatch(html, /bg-\[#0b1517\]|bg-\[var\(--industrial-panel\)\]/)
})
