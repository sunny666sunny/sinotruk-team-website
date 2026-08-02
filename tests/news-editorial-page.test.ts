import assert from 'node:assert/strict'
import test from 'node:test'

import { newsRedirects } from '../data/news'
import { parseEditorialContent, resolveNewsRedirect } from '../lib/content/editorial-content'

test('editorial content parser emits headings, lists and paragraphs', () => {
  assert.deepEqual(parseEditorialContent('Opening text.\n\n## Check the truck\n\n- VIN\n- Engine\n- Axle\n\nClosing text.'), [
    { type: 'paragraph', text: 'Opening text.' },
    { type: 'heading', text: 'Check the truck' },
    { type: 'list', items: ['VIN', 'Engine', 'Axle'] },
    { type: 'paragraph', text: 'Closing text.' },
  ])
})

test('all removed news slugs resolve to permanent canonical destinations', () => {
  for (const [source, target] of Object.entries(newsRedirects)) {
    assert.deepEqual(resolveNewsRedirect(source), { destination: `/news/${target}`, permanent: true })
  }
  assert.equal(resolveNewsRedirect('not-a-redirect'), null)
})

test('Next server config owns every permanent news redirect', async () => {
  const config = (await import('../next.config.mjs')).default
  const redirects = await config.redirects()
  assert.equal(redirects.length, 22)
  for (const [source, target] of Object.entries(newsRedirects)) {
    assert.ok(redirects.some((item: { source: string; destination: string; permanent: boolean }) => item.source === `/news/${source}` && item.destination === `/news/${target}` && item.permanent))
  }
})
