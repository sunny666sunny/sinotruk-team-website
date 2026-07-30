import { prisma } from '@/lib/db'
import { fingerprintUrl } from './fingerprint'
import type { GeneratedArticle } from './generate'

type PublishTransaction = {
  news: { upsert: (args: any) => Promise<{ id: string }> }
  newsRevision: { create: (args: any) => Promise<unknown> }
  contentJob: { update: (args: any) => Promise<unknown> }
}
type PublishDb = { $transaction: <T>(work: (tx: PublishTransaction) => Promise<T>) => Promise<T> }

export async function publishGeneratedArticle(article: GeneratedArticle, jobId: string, deps: { db?: PublishDb; now?: () => Date } = {}) {
  const db = deps.db || (prisma as unknown as PublishDb)
  const now = deps.now || (() => new Date())
  return db.$transaction(async (tx) => {
    const payload = JSON.stringify(article)
    const news = await tx.news.upsert({
      where: { slug: article.slug },
      create: { slug: article.slug, title: article.title, date: now().toISOString().slice(0, 10), image: '/images/news/banner-news.webp', excerpt: article.excerpt, content: article.body, category: 'Procurement Guides', tags: JSON.stringify(article.keywords), seoTitle: article.seoTitle, seoDescription: article.seoDescription, keywords: JSON.stringify(article.keywords), internalLinks: JSON.stringify(article.relatedProductIds), externalLinks: JSON.stringify([article.sourceUrl]), isPublished: true, sourceUrl: article.sourceUrl, sourceTitle: article.sourceTitle, sourceDate: article.sourceDate || null, sourceFingerprint: fingerprintUrl(article.sourceUrl), generatedBy: 'fact-bound-editorial-automation' },
      update: { title: article.title, excerpt: article.excerpt, content: article.body, seoTitle: article.seoTitle, seoDescription: article.seoDescription, keywords: JSON.stringify(article.keywords), internalLinks: JSON.stringify(article.relatedProductIds), externalLinks: JSON.stringify([article.sourceUrl]), sourceTitle: article.sourceTitle, sourceDate: article.sourceDate || null, isPublished: true, generatedBy: 'fact-bound-editorial-automation' },
    })
    await tx.newsRevision.create({ data: { newsId: news.id, payload, reason: 'Automated fact-bound editorial publication' } })
    await tx.contentJob.update({ where: { id: jobId }, data: { status: 'published', generatedPayload: payload, newsId: news.id, publishedAt: now(), errorStage: null, errorMessage: null } })
    return { newsId: news.id }
  })
}
