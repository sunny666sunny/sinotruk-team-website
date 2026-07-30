import { absoluteUrl } from './site-url'

export function renderRobots(siteUrl?: string) {
  return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${absoluteUrl('/sitemap.xml', siteUrl)}\n`
}
