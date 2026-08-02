import type { NewsItem } from '@/data/news'

export const highRiskContentPatterns = [
  /authorized dealer/i,
  /factory[- ]direct price/i,
  /best price/i,
  /financing available/i,
  /manufacturer warranty/i,
  /immediate delivery/i,
  /leading manufacturer/i,
  /\bguaranteed\b/i,
]

export function auditReviewedNews(items: NewsItem[]) {
  const findings: Array<{ level: 'high' | 'medium'; slug: string; field: string; message: string }> = []
  const seoTitles = new Map<string, string>()
  const descriptions = new Map<string, string>()

  for (const item of items) {
    const fields = { title: item.title, excerpt: item.excerpt, content: item.content, seoTitle: item.seoTitle, seoDescription: item.seoDescription }
    for (const [field, value] of Object.entries(fields)) {
      if (highRiskContentPatterns.some((pattern) => pattern.test(value))) findings.push({ level: 'high', slug: item.slug, field, message: 'unsupported commercial claim' })
    }
    if (/\b20(?:1\d|2[0-5])\b/.test(`${item.seoTitle} ${item.seoDescription}`)) findings.push({ level: 'medium', slug: item.slug, field: 'seo', message: 'dated SEO promise' })
    const titleKey = item.seoTitle.trim().toLowerCase()
    const descriptionKey = item.seoDescription.trim().toLowerCase()
    if (seoTitles.has(titleKey)) findings.push({ level: 'high', slug: item.slug, field: 'seoTitle', message: `duplicate of ${seoTitles.get(titleKey)}` })
    else seoTitles.set(titleKey, item.slug)
    if (descriptions.has(descriptionKey)) findings.push({ level: 'high', slug: item.slug, field: 'seoDescription', message: `duplicate of ${descriptions.get(descriptionKey)}` })
    else descriptions.set(descriptionKey, item.slug)
  }
  return findings
}
