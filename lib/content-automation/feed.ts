import { assertFetchableSource } from './source-policy'
import type { SourcePolicy } from './types'

type Lookup = (host: string) => Promise<string[]>
type Fetch = (input: string, init: RequestInit) => Promise<Response>

export interface SourceFetchDeps {
  fetch?: Fetch
  lookup?: Lookup
}

async function readBody(response: Response, maxBytes: number) {
  if (!response.body) return ''
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let byteLength = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    byteLength += value.byteLength
    if (byteLength > maxBytes) {
      await reader.cancel()
      throw new Error('Source response exceeds the configured byte limit.')
    }
    chunks.push(value)
  }
  const buffer = new Uint8Array(byteLength)
  let offset = 0
  for (const chunk of chunks) {
    buffer.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder().decode(buffer)
}

export async function fetchSourceDocument(startUrl: string, policy: SourcePolicy, deps: SourceFetchDeps = {}) {
  const request = deps.fetch || fetch
  let currentUrl = startUrl
  for (let redirects = 0; redirects <= policy.maxRedirects; redirects += 1) {
    await assertFetchableSource(currentUrl, policy, deps.lookup)
    const response = await request(currentUrl, { redirect: 'manual', signal: AbortSignal.timeout(policy.timeoutMs), headers: { accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9' } })
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (!location || redirects === policy.maxRedirects) throw new Error('Source redirect limit exceeded.')
      currentUrl = new URL(location, currentUrl).toString()
      continue
    }
    if (!response.ok) throw new Error(`Source request failed with HTTP ${response.status}.`)
    const contentType = response.headers.get('content-type') || ''
    if (!/(application\/(rss\+xml|atom\+xml|xml)|text\/(xml|html))/i.test(contentType)) throw new Error('Source response type is not XML or HTML.')
    return { url: currentUrl, contentType, body: await readBody(response, policy.maxBytes) }
  }
  throw new Error('Source redirect limit exceeded.')
}
