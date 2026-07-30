export const NEWS_CATEGORIES = [
  'Manufacturer News',
  'Brand News',
  'Industry Insights',
  'Procurement Guides',
] as const

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

type CategoryInput = { title: string; category?: string | null }
type SourceInput = { sourceUrl?: string | null; sourceTitle?: string | null }

export function getNewsCategory({ title, category }: CategoryInput): NewsCategory {
  if (NEWS_CATEGORIES.includes(category as NewsCategory)) return category as NewsCategory

  const normalizedTitle = title.toLowerCase()
  if (/(manufacturer|sinotruk group|production|launch)/.test(normalizedTitle)) return 'Manufacturer News'
  if (/(howo|sitrak|brand)/.test(normalizedTitle)) return 'Brand News'
  if (/(market|industry|regulation|transport trend)/.test(normalizedTitle)) return 'Industry Insights'
  return 'Procurement Guides'
}

export function getNewsSourceLabel({ sourceUrl, sourceTitle }: SourceInput) {
  if (sourceUrl) return `Based on ${sourceTitle || 'the cited source'}.`
  return 'Original procurement guide prepared by SINOTRUK TEAM.'
}
