import type { GeneratedArticle } from './generate'
import type { FactPacket } from './types'

const words = (value: string) => value.trim().split(/\s+/).filter(Boolean)
const normalized = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

export function checkGeneratedArticle(article: GeneratedArticle, packet: FactPacket) {
  const issues: string[] = []
  if (!article.sourceUrl || !article.sourceTitle || article.sourceUrl !== packet.sourceUrl) issues.push('missing_source')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) issues.push('invalid_slug')
  if (!article.title || !article.excerpt || !article.body || !article.seoTitle || !article.seoDescription) issues.push('missing_required_field')
  if (words(article.body).length < 300 || words(article.body).length > 1800) issues.push('invalid_body_length')
  if (article.seoTitle.length < 35 || article.seoTitle.length > 75) issues.push('invalid_seo_title_length')
  if (article.seoDescription.length < 120 || article.seoDescription.length > 160) issues.push('invalid_seo_description_length')
  if (!article.relatedProductIds.length || article.relatedProductIds.some((path) => !path.startsWith('/'))) issues.push('invalid_internal_links')
  if (!article.keywords.length) issues.push('missing_keywords')

  const allowedNumbers = new Set([packet.sourceDate || '', ...packet.facts].join(' ').match(/\b\d+(?:[.,]\d+)?\b/g) || [])
  for (const number of article.body.match(/\b\d+(?:[.,]\d+)?\b/g) || []) if (!allowedNumbers.has(number)) issues.push('unsupported_number')

  const body = normalized(article.body)
  if (packet.facts.some((fact) => words(fact).length >= 8 && body.includes(normalized(fact)))) issues.push('source_overlap')
  return { publishable: issues.length === 0, issues: [...new Set(issues)] }
}
