import { newsRedirects } from '@/data/news'

export type EditorialBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }

export function parseEditorialContent(content: string): EditorialBlock[] {
  return content.split(/\n\s*\n/).map((block): EditorialBlock | null => {
    const value = block.trim()
    if (!value) return null
    if (value.startsWith('## ')) return { type: 'heading', text: value.slice(3).trim() }
    const lines = value.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length && lines.every((line) => line.startsWith('- '))) {
      return { type: 'list', items: lines.map((line) => line.slice(2).trim()) }
    }
    return { type: 'paragraph', text: value }
  }).filter((block): block is EditorialBlock => block !== null)
}

export function resolveNewsRedirect(slug: string) {
  const target = newsRedirects[slug]
  return target ? { destination: `/news/${target}`, permanent: true as const } : null
}
