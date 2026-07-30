import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, ExternalLink } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SiteImage } from '@/components/SiteImage'
import type { NewsItem } from '@/data/news'
import { getPublishedNews, getPublishedNewsItem } from '@/lib/content/repository'
import { getNewsCategory, getNewsSourceLabel } from '@/lib/content/news-presentation'
import { SeoHead } from '@/components/seo/SeoHead'

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function NewsDetailPage({ item, previous, next, related }: { item: NewsItem; previous: NewsItem | null; next: NewsItem | null; related: NewsItem[] }) {
  const sourceLabel = getNewsSourceLabel(item)
  const paragraphs = item.content.split('\n\n').filter((paragraph) => paragraph.trim())
  return <><SeoHead input={{ path: `/news/${item.slug}`, pageType: 'article', name: item.seoTitle, description: item.seoDescription, image: item.image, datePublished: item.date, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }, { name: item.title, path: `/news/${item.slug}` }] }} /><Header />
    <main id="main"><section className="border-b border-[var(--color-line)] bg-[var(--color-canvas)]"><div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"><div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-steel)]"><Link href="/" className="hover:text-[var(--color-signal-dark)]">Home</Link><ChevronRight className="h-4 w-4" /><Link href="/news" className="hover:text-[var(--color-signal-dark)]">News</Link><ChevronRight className="h-4 w-4" /><span className="truncate">{item.title}</span></div><div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[var(--color-signal-dark)]"><span>{getNewsCategory(item)}</span><span className="h-1 w-1 rounded-full bg-[var(--color-steel)]" /><time dateTime={item.date} className="inline-flex items-center gap-2 font-normal text-[var(--color-steel)]"><Calendar className="h-4 w-4" />{formatDate(item.date)}</time></div><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl">{item.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-steel)]">{item.excerpt}</p></div></section>
      <article className="bg-[var(--color-panel)] py-10 lg:py-14"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)]"><SiteImage src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" /></div><div className="mt-8 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-5 text-sm leading-6 text-[var(--color-steel)]"><p className="font-semibold text-[var(--color-ink)]">Source information</p><p className="mt-1">{sourceLabel}</p>{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--color-signal-dark)] hover:text-[var(--color-ink)]">Open cited source <ExternalLink className="h-4 w-4" /></a>}</div><div className="mt-9 space-y-6 text-lg leading-8 text-[var(--color-ink)]">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)}</div>
        <div className="mt-12 grid gap-4 border-t border-[var(--color-line)] pt-8 sm:grid-cols-2">{previous ? <Link href={`/news/${previous.slug}`} className="rounded-xl border border-[var(--color-line)] p-4 hover:border-[var(--color-signal)]"><span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-steel)]"><ArrowLeft className="h-4 w-4" />Previous</span><span className="mt-2 block font-semibold text-[var(--color-ink)]">{previous.title}</span></Link> : <div />}{next ? <Link href={`/news/${next.slug}`} className="rounded-xl border border-[var(--color-line)] p-4 text-right hover:border-[var(--color-signal)]"><span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-steel)]">Next<ArrowRight className="h-4 w-4" /></span><span className="mt-2 block font-semibold text-[var(--color-ink)]">{next.title}</span></Link> : <div />}</div><div className="mt-7"><Link href="/news" className="inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--color-signal-dark)] hover:text-[var(--color-ink)]"><ArrowLeft className="h-4 w-4" />Back to all articles</Link></div></div></article>
      {related.length > 0 && <section className="bg-[var(--color-canvas)] py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold tracking-[-0.025em] text-[var(--color-ink)]">Continue your research</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{related.map((relatedItem) => <Link key={relatedItem.slug} href={`/news/${relatedItem.slug}`} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5 hover:border-[var(--color-signal)]"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-signal-dark)]">{getNewsCategory(relatedItem)}</span><h3 className="mt-3 font-bold text-[var(--color-ink)]">{relatedItem.title}</h3></Link>)}</div></div></section>}
    </main><Footer /></>
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: (await getPublishedNews()).map((item) => ({ params: { slug: item.slug } })), fallback: false })

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug || '')
  const [item, items] = await Promise.all([getPublishedNewsItem(slug), getPublishedNews()])
  if (!item) return { notFound: true }
  const index = items.findIndex((candidate) => candidate.slug === item.slug)
  return { props: { item, previous: index > 0 ? items[index - 1] : null, next: index < items.length - 1 ? items[index + 1] : null, related: items.filter((candidate) => candidate.slug !== item.slug && getNewsCategory(candidate) === getNewsCategory(item)).slice(0, 3) } }
}
