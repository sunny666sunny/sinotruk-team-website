import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import type { NextRouter } from 'next/router'

import OurFacilitiesPage from '../pages/about/our-facilities'
import OurJourneyPage from '../pages/about/our-journey'
import AboutPage from '../pages/about'
import SocialResponsibilityPage from '../pages/about/social-responsibility'
import WhoWeArePage from '../pages/about/who-we-are'
import ServicePage from '../pages/service'
import AfterSalesServicePage from '../pages/service/after-sales-service'
import MaintenanceManualPage from '../pages/service/maintenance-manual'
import ServiceBroadcastPage from '../pages/service/service-broadcast'

const router = {
  basePath: '', pathname: '/', route: '/', query: {}, asPath: '/',
  push: async () => true, replace: async () => true, reload: () => undefined, back: () => undefined, forward: () => undefined,
  prefetch: async () => undefined, beforePopState: () => undefined,
  events: { on: () => undefined, off: () => undefined, emit: () => undefined },
  isFallback: false, isLocaleDomain: false, isReady: true, isPreview: false,
} as NextRouter
const render = (component: () => React.ReactNode) => renderToStaticMarkup(createElement(RouterContext.Provider, { value: router }, createElement(component)))
const countHeadings = (markup: string, level: number) => (markup.match(new RegExp(`<h${level}\\b`, 'g')) ?? []).length

test('about journey and facilities use distinct image-led compositions with one page heading', () => {
  const journey = render(OurJourneyPage)
  const facilities = render(OurFacilitiesPage)

  assert.equal(countHeadings(journey, 1), 1)
  assert.equal(countHeadings(facilities, 1), 1)
  assert.match(journey, /<ol[^>]+aria-label="Development timeline"/)
  assert.match(facilities, /<ul[^>]+aria-label="Manufacturing facilities gallery"/)
  assert.match(journey, /alt="SINOTRUK development milestone 1"/)
  assert.match(facilities, /alt="Manufacturing facility: Axle Assy Line"/)
})

test('about landing and every about route keep one H1 and locally hosted editorial images', () => {
  const landing = render(AboutPage)
  const routes = [landing, render(WhoWeArePage), render(OurJourneyPage), render(OurFacilitiesPage), render(SocialResponsibilityPage)]

  for (const markup of routes) {
    assert.equal(countHeadings(markup, 1), 1)
    assert.match(markup, /(?:url=)?%2Fimages%2F|src="\/images\//)
  }
  assert.match(landing, /<ol[^>]+aria-label="About chapters"/)
})

test('service routes present procurement work as ordered tasks with real service imagery', () => {
  const landing = render(ServicePage)
  const detailRoutes = [render(AfterSalesServicePage), render(MaintenanceManualPage), render(ServiceBroadcastPage)]

  assert.equal(countHeadings(landing, 1), 1)
  assert.match(landing, /<ol[^>]+aria-label="Procurement service tasks"/)
  for (const markup of detailRoutes) {
    assert.equal(countHeadings(markup, 1), 1)
    assert.match(markup, /<ol[^>]+aria-label="Service tasks"/)
    assert.match(markup, /(?:url=)?%2Fimages%2Freference%2F|src="\/images\/reference\//)
    assert.match(markup, /Request a quote/i)
  }
})
