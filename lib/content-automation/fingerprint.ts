import { createHash } from 'node:crypto'

export function normalizeSourceUrl(value: string) {
  const url = new URL(value)
  url.hash = ''
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|fbclid$|gclid$|mc_)/i.test(key)) url.searchParams.delete(key)
  }
  url.searchParams.sort()
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '')
  return url.toString()
}

export function fingerprintUrl(value: string) {
  return createHash('sha256').update(normalizeSourceUrl(value)).digest('hex')
}
