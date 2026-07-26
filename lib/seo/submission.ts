import jwt from 'jsonwebtoken'
import { absoluteUrl, normalizeSiteUrl } from './site-url'

export type IndexNowPayload = {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export function buildIndexNowPayload(urls: string[], key: string, siteUrl = process.env.SITE_URL): IndexNowPayload {
  const baseUrl = normalizeSiteUrl(siteUrl)
  const siteHost = new URL(baseUrl).host
  const urlList = Array.from(new Set(urls.map((url) => absoluteUrl(url, baseUrl))))
    .filter((url) => new URL(url).host === siteHost)
  return {
    host: siteHost,
    key,
    keyLocation: `${baseUrl}/api/indexnow-key`,
    urlList,
  }
}

export function googleSitemapEndpoint(siteUrl: string, sitemapUrl: string) {
  return `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`
}

export async function submitToIndexNow(urls: string[], fetcher: typeof fetch = fetch) {
  const key = process.env.INDEXNOW_KEY?.trim()
  if (!key) throw new Error('INDEXNOW_KEY is not configured')
  const payload = buildIndexNowPayload(urls, key)
  const response = await fetcher('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`IndexNow returned HTTP ${response.status}`)
  return { status: response.status, submitted: payload.urlList.length }
}

async function getGoogleAccessToken(fetcher: typeof fetch) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n').trim()
  if (!email || !privateKey) throw new Error('Google Search Console credentials are not configured')
  const now = Math.floor(Date.now() / 1000)
  const assertion = jwt.sign({
    iss: email,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }, privateKey, { algorithm: 'RS256' })
  const response = await fetcher('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const body = await response.json() as { access_token?: string; error_description?: string }
  if (!response.ok || !body.access_token) throw new Error(body.error_description || `Google OAuth returned HTTP ${response.status}`)
  return body.access_token
}

export async function submitSitemapToGoogle(fetcher: typeof fetch = fetch) {
  const siteUrl = normalizeSiteUrl(process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || process.env.SITE_URL)
  const sitemapUrl = absoluteUrl('/sitemap.xml', siteUrl)
  const accessToken = await getGoogleAccessToken(fetcher)
  const response = await fetcher(googleSitemapEndpoint(siteUrl, sitemapUrl), {
    method: 'PUT', headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error(`Google Search Console returned HTTP ${response.status}`)
  return { status: response.status, sitemapUrl }
}
