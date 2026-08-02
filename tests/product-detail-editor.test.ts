import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { ProductDetailContentEditor } from '../components/admin/ProductDetailContentEditor'
import { generateProductDetailContent } from '../lib/product-detail/generate'
import { allProducts } from '../data/products'

test('中文后台编辑器展示自动补全和全部详情 SEO 分组', () => {
  const content = generateProductDetailContent(allProducts[0])
  const html = renderToStaticMarkup(React.createElement(ProductDetailContentEditor, { value: content, onChange: () => undefined, onGenerate: () => undefined }))

  for (const label of ['自动补全详情 SEO 内容', 'Performance 总述', '画廊 SEO 描述', '应用场景', '解决方案', '独立 FAQ']) assert.match(html, new RegExp(label))
  assert.equal((html.match(/data-faq-item=/g) || []).length, 5)
})
