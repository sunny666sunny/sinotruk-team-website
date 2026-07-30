import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const readPage = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')
const countOccurrences = (source: string, value: string) => source.split(value).length - 1

test('public page headers are rendered once per page', () => {
  const contactPage = readPage('../pages/contact.tsx')
  const newsPage = readPage('../pages/news/index.tsx')

  assert.equal(countOccurrences(contactPage, 'Prepare a clear truck or parts RFQ.'), 1)
  assert.equal(countOccurrences(newsPage, 'News and practical procurement guidance'), 1)
  assert.match(contactPage, /<PageHero/)
  assert.match(newsPage, /banner-news\.webp/)
})
