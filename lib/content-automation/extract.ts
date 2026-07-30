import type { FactPacket, FeedItem } from './types'

const decode = (value: string) => value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const text = (value: string) => decode(value.replace(/<[^>]+>/g, ' '))
const tag = (value: string, name: string) => new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i').exec(value)?.[1]

export function parseFeed(xml: string, feedUrl: string): FeedItem[] {
  const entries = xml.match(/<(?:item|entry)(?:\s[^>]*)?>[\s\S]*?<\/(?:item|entry)>/gi) || []
  return entries.map((entry) => {
    const rawUrl = tag(entry, 'link') || /<link[^>]+href=["']([^"']+)["']/i.exec(entry)?.[1] || ''
    const url = new URL(decode(rawUrl), feedUrl).toString()
    const rawDate = tag(entry, 'pubDate') || tag(entry, 'updated') || tag(entry, 'published') || ''
    const parsedDate = new Date(decode(rawDate))
    return { title: text(tag(entry, 'title') || ''), url, ...(Number.isNaN(parsedDate.valueOf()) ? {} : { date: parsedDate.toISOString().slice(0, 10) }) }
  }).filter((item) => item.title && item.url)
}

export function extractFactPacket(html: string, item: FeedItem): FactPacket {
  const article = /<article(?:\s[^>]*)?>([\s\S]*?)<\/article>/i.exec(html)?.[1] || html
  const paragraphs = [...article.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)].map((match) => text(match[1])).filter(Boolean)
  const entityPattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g
  const quotedEntities = [...new Set(paragraphs.flatMap((paragraph) => paragraph.match(entityPattern) || []))]
  const facts = paragraphs.filter((paragraph) => !quotedEntities.some((entity) => paragraph.includes(entity)))
  const productHints = [...new Set(facts.flatMap((fact) => ['truck', 'vehicle', 'tractor', 'dump truck', 'parts'].filter((hint) => new RegExp(`\\b${hint}\\b`, 'i').test(fact))))]
  return { sourceUrl: item.url, sourceTitle: item.title, ...(item.date ? { sourceDate: item.date } : {}), facts, quotedEntities, productHints }
}
