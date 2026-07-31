import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SiteImage } from '@/components/SiteImage'
import type { NewsItem } from '@/data/news'
import { getPublishedNews } from '@/lib/content/repository'
import { getNewsCategory, getNewsSourceLabel, NEWS_CATEGORIES } from '@/lib/content/news-presentation'
import { SeoHead } from '@/components/seo/SeoHead'

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function NewsPage({ items }: { items: NewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState<'All' | (typeof NEWS_CATEGORIES)[number]>('All')
  const filteredItems = useMemo(() => items.filter((item) => activeCategory === 'All' || getNewsCategory(item) === activeCategory), [activeCategory, items])

  return <div className="industrial-page">
    <SeoHead input={{ path: '/news', pageType: 'collection', name: 'Truck News & Procurement Guides', description: 'Manufacturer news, industry insights, and practical commercial-truck procurement guides for international buyers.', image: '/images/news/banner-news.webp', items: items.map((item) => ({ name: item.title, url: `/news/${item.slug}` })) }} />
    <Header />
    <main id="main" className="pt-16 lg:pt-[72px]">
      <section className="relative isolate min-h-[330px] overflow-hidden border-b border-[var(--industrial-line)]">
        <SiteImage src="/images/news/banner-news.webp" alt="Commercial trucks at a production facility" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,12,14,.96),rgba(3,12,14,.54)_62%,rgba(3,12,14,.2))]" />
        <div className="mx-auto flex min-h-[330px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8"><p className="industrial-home-kicker">News desk</p><h1 className="mt-4 max-w-5xl [font-family:var(--industrial-display)] text-5xl font-bold uppercase leading-[.9] tracking-[-.05em] sm:text-7xl">News and practical procurement guidance</h1><p className="mt-5 max-w-2xl leading-7 text-[var(--industrial-muted)]">Manufacturer news, industry insights and commercial-truck procurement guides for international buyers.</p></div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 border-b border-[var(--industrial-line)] pb-8 lg:grid-cols-[1fr_auto] lg:items-end"><p className="max-w-3xl leading-7 text-[var(--industrial-muted)]">Use current updates and configuration guides to prepare a clearer truck or parts requirement before requesting a quotation.</p><div className="flex flex-wrap gap-2" aria-label="News category filters">{(['All', ...NEWS_CATEGORIES] as const).map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`min-h-11 border px-4 text-xs font-semibold uppercase tracking-[.08em] ${activeCategory === category ? 'border-[var(--industrial-accent)] bg-[var(--industrial-accent)] text-[#061314]' : 'border-[var(--industrial-line)] text-[var(--industrial-muted)] hover:text-[var(--industrial-text)]'}`}>{category}</button>)}</div></div>

          {filteredItems.length ? <div aria-label="News editorial grid" className="mt-8 grid auto-rows-min gap-4 md:grid-cols-12">
            {filteredItems.map((item, index) => {
              const lead = index === 0
              return <article key={item.slug} className={`group overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)] ${lead ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4'}`}>
                <Link href={`/news/${item.slug}`} className="block h-full">
                  <div className={`relative overflow-hidden ${lead ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[16/10]'}`}><SiteImage src={item.image} alt={item.title} fill sizes={lead ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 34vw, 100vw'} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
                  <div className={lead ? 'p-7 sm:p-9' : 'p-5'}>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[.1em] text-[var(--industrial-muted)]">{lead && <span className="text-[var(--industrial-accent)]">Lead story</span>}<span>{getNewsCategory(item)}</span><time dateTime={item.date}>{formatDate(item.date)}</time></div>
                    <h2 className={`mt-4 [font-family:var(--industrial-display)] font-semibold uppercase leading-[1.02] tracking-[-.025em] ${lead ? 'text-4xl sm:text-5xl' : 'text-2xl'}`}>{item.title}</h2>
                    <p className={`mt-4 leading-7 text-[var(--industrial-muted)] ${lead ? 'max-w-3xl' : 'line-clamp-3 text-sm'}`}>{item.excerpt}</p>
                    <p className="mt-4 text-xs leading-5 text-[var(--industrial-muted)]">
                      {item.sourceUrl ? getNewsSourceLabel(item) : 'Source details are disclosed in the article.'}
                    </p>
                    <span className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[var(--industrial-accent)] text-sm font-semibold">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </article>
            })}
          </div> : <div className="mt-8 border border-dashed border-[var(--industrial-line)] p-10 text-center text-[var(--industrial-muted)]">No articles are available in this category yet.</div>}

        </div>
      </section>
      <section className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Prepare the next RFQ</h2><p className="mt-2 text-[var(--industrial-muted)]">Share the operating conditions and available vehicle or parts identifiers.</p></div><Link href="/contact" className="industrial-home-text-link">Request a quote <ArrowRight /></Link></div></section>
    </main>
    <Footer />
  </div>
}

export const getStaticProps: GetStaticProps<{ items: NewsItem[] }> = async () => ({ props: { items: await getPublishedNews() } })
