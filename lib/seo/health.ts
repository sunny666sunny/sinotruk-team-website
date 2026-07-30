export type SeoAuditPage = { url: string; title: string; canonical?: string; images: Array<{ alt?: string }>; links: string[] }
export type SeoIssue = { code: 'missing_canonical' | 'duplicate_title' | 'missing_alt' | 'orphan_page'; url: string; message: string }

export function auditSeo(pages: SeoAuditPage[]) {
  const issues: SeoIssue[] = []
  const titleCounts = new Map<string, number>()
  for (const page of pages) titleCounts.set(page.title, (titleCounts.get(page.title) || 0) + 1)
  const incoming = new Set(pages.flatMap((page) => page.links))
  for (const page of pages) {
    if (!page.canonical) issues.push({ code: 'missing_canonical', url: page.url, message: '缺少 canonical 地址。' })
    if ((titleCounts.get(page.title) || 0) > 1 && pages.find((candidate) => candidate.title === page.title)?.url === page.url) issues.push({ code: 'duplicate_title', url: page.url, message: '页面标题与其他页面重复。' })
    if (page.images.some((image) => !image.alt?.trim())) issues.push({ code: 'missing_alt', url: page.url, message: '存在缺少替代文本的图片。' })
    if (page.url !== '/' && !incoming.has(page.url)) issues.push({ code: 'orphan_page', url: page.url, message: '没有站内链接指向该页面。' })
  }
  return { issues }
}
