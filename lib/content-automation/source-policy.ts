import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import type { SourcePolicy } from './types'

type Lookup = (host: string) => Promise<string[]>

function isUnsafeIp(address: string) {
  const value = address.toLowerCase().replace(/^\[|\]$/g, '')
  if (isIP(value) === 4) {
    const [first, second] = value.split('.').map(Number)
    return first === 0 || first === 10 || first === 127 || first >= 224 || (first === 169 && second === 254) || (first === 172 && second >= 16 && second <= 31) || (first === 192 && second === 168)
  }
  if (isIP(value) === 6) return value === '::1' || value.startsWith('fe80:') || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('ff') || value.startsWith('::ffff:127.') || value.startsWith('::ffff:10.') || value.startsWith('::ffff:192.168.')
  return false
}

function allowedHost(host: string, allowedHosts: string[]) {
  const normalized = host.toLowerCase()
  return allowedHosts.some((candidate) => normalized === candidate.toLowerCase() || normalized.endsWith(`.${candidate.toLowerCase()}`))
}

const systemLookup: Lookup = async (host) => (await lookup(host, { all: true, verbatim: true })).map((record) => record.address)

export async function assertFetchableSource(value: string, policy: SourcePolicy, resolveHost: Lookup = systemLookup) {
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP(S) sources are supported.')
  if (!allowedHost(url.hostname, policy.allowedHosts)) throw new Error('Source host is not allowlisted.')
  const addresses = isIP(url.hostname) ? [url.hostname] : await resolveHost(url.hostname)
  if (!addresses.length || addresses.some(isUnsafeIp)) throw new Error('Source resolves to a private or unsafe network address.')
  return url
}
