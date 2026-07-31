import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'

import VideoPage from '../pages/video'
import PrivacyPage from '../pages/privacy'
import TermsPage from '../pages/terms'

const router = {
  basePath: '', pathname: '/', route: '/', query: {}, asPath: '/',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter
const render = (component: () => React.ReactNode) => renderToStaticMarkup(createElement(RouterContext.Provider, { value: router }, createElement(component)))

test('video page uses one heading, real covers and an honest no-player state', () => {
  const markup = render(VideoPage)
  const main = markup.slice(markup.indexOf('<main'), markup.indexOf('</main>') + 7)

  assert.equal((main.match(/<h1\b/g) ?? []).length, 1)
  assert.match(main, /No hosted video URL is currently published/)
  assert.match(main, /(?:url=)?%2Fimages%2Fproducts%2F|src="\/images\/products\//)
  assert.doesNotMatch(main, /<iframe|aria-label="Play|>Play video</i)
})

test('legal pages render one H1 and a narrow, labelled document article', () => {
  const privacy = render(PrivacyPage)
  const terms = render(TermsPage)

  assert.equal((privacy.match(/<h1\b/g) ?? []).length, 1)
  assert.equal((terms.match(/<h1\b/g) ?? []).length, 1)
  assert.match(privacy, /<article[^>]+aria-label="Privacy notice document"/)
  assert.match(terms, /<article[^>]+aria-label="Website terms document"/)
})
