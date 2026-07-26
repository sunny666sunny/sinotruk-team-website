const DEFAULT_SITE_URL = 'https://sinotrukteam.com'

export function normalizeSiteUrl(value?: string): string {
  const candidate = value?.trim() || DEFAULT_SITE_URL
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`

  try {
    const url = new URL(withProtocol)
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    if (!isLocal) url.protocol = 'https:'
    url.pathname = url.pathname.replace(/\/+$/, '')
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_SITE_URL
  }
}

export function absoluteUrl(path: string, siteUrl?: string): string {
  if (/^https?:\/\//i.test(path)) {
    try {
      return new URL(path).toString()
    } catch {
      return normalizeSiteUrl(siteUrl)
    }
  }

  const base = normalizeSiteUrl(siteUrl)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, `${base}/`).toString()
}
