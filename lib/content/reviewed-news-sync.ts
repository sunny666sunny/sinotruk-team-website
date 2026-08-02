import { newsItems, newsRedirects } from '@/data/news'

export function buildReviewedNewsRows() {
  return newsItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    date: item.date,
    image: item.image,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category || 'Procurement Guides',
    tags: JSON.stringify(item.keywords.slice(1)),
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    keywords: JSON.stringify(item.keywords),
    internalLinks: JSON.stringify(item.internalLinks),
    externalLinks: JSON.stringify(item.sourceUrl ? [item.sourceUrl] : []),
    isPublished: true,
    sourceUrl: item.sourceUrl || null,
    sourceTitle: item.sourceTitle || null,
    sourceDate: item.sourceDate || null,
    generatedBy: 'reviewed-editorial',
    updatedAt: new Date(`${item.updatedAt || item.date}T00:00:00.000Z`),
  }))
}

export async function synchronizeReviewedNews(options: {
  createBackup: () => Promise<{ databaseCopy: string }>
  commit: (rows: ReturnType<typeof buildReviewedNewsRows>, removedSlugs: string[]) => Promise<void>
}) {
  const backup = await options.createBackup()
  const rows = buildReviewedNewsRows()
  const removedSlugs = Object.keys(newsRedirects)
  await options.commit(rows, removedSlugs)
  return { reviewedNews: rows.length, removedNews: removedSlugs.length, databaseCopy: backup.databaseCopy }
}
