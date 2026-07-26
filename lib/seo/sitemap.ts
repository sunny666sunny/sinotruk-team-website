export type SitemapEntry = { url: string; lastModified?: string | Date }

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function renderSitemap(entries: SitemapEntry[]) {
  const body = entries.map((entry) => {
    const lastmod = entry.lastModified ? `<lastmod>${escapeXml(entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified)}</lastmod>` : ''
    return `<url><loc>${escapeXml(entry.url)}</loc>${lastmod}</url>`
  }).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`
}
