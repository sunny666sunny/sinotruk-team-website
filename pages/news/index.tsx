import { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SiteImage } from '@/components/SiteImage'
import type { NewsItem } from '@/data/news'
import { getPublishedNews } from '@/lib/content/repository'
import { getNewsCategory, NEWS_CATEGORIES } from '@/lib/content/news-presentation'

const ITEMS_PER_PAGE = 9
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function NewsPage({ items }: { items: NewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState<'All' | (typeof NEWS_CATEGORIES)[number]>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const filteredItems = useMemo(() => items.filter((item) => activeCategory === 'All' || getNewsCategory(item) === activeCategory), [activeCategory, items])
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const selectCategory = (category: typeof activeCategory) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return <>
    <Head>
      <title>Truck News & Procurement Guides | SINOTRUK TEAM</title>
      <meta name="description" content="Manufacturer news, industry insights, and practical commercial-truck procurement guides for international buyers." />
    </Head>
    <Header />
    <main id="main">
      <section className="relative isolate min-h-[300px] overflow-hidden bg-[var(--color-ink)] text-white"><SiteImage src="/images/news/banner-news.webp" alt="Commercial truck news" fill priority sizes="100vw" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,39,.86),rgba(16,35,39,.25))]" /><div className="mx-auto flex min-h-[300px] max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[.14em] text-teal-100">News</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">News and practical procurement guidance</h1><p className="mt-3 max-w-2xl text-lg leading-7 text-slate-100">Manufacturer news, industry insights and commercial-truck procurement guides for international buyers.</p></div></section>
      <section className="border-b border-[var(--color-line)] bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="max-w-3xl leading-7 text-[var(--color-steel)]">Use current updates and configuration guides to prepare a clearer truck or parts requirement before you request a quotation.</p>
        </div>
      </section>
      <section className="bg-[var(--color-panel)] py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2" aria-label="News category filters">
            {(['All', ...NEWS_CATEGORIES] as const).map((category) => <button key={category} type="button" onClick={() => selectCategory(category)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-signal)] ${activeCategory === category ? 'border-[var(--color-signal-dark)] bg-[var(--color-signal-dark)] text-white' : 'border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] hover:border-[var(--color-signal)]'}`}>{category}</button>)}
          </div>
          {paginatedItems.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{paginatedItems.map((item) => <article key={item.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[0_12px_32px_rgb(23_40_44_/_0.06)]">
            <Link href={`/news/${item.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[var(--color-canvas)]"><SiteImage src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-300 hover:scale-[1.02]" /></Link>
            <div className="flex flex-1 flex-col p-6"><div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-signal-dark)]"><span>{getNewsCategory(item)}</span><span className="h-1 w-1 rounded-full bg-[var(--color-steel)]" /><time dateTime={item.date} className="normal-case tracking-normal text-[var(--color-steel)]">{formatDate(item.date)}</time></div>
              <h2 className="mt-4 text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)]"><Link href={`/news/${item.slug}`} className="hover:text-[var(--color-signal-dark)]">{item.title}</Link></h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-steel)]">{item.excerpt}</p>
              <Link href={`/news/${item.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)] hover:text-[var(--color-ink)]">Read article <ArrowRight className="h-4 w-4" /></Link></div>
          </article>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-[var(--color-steel)]">No articles are available in this category yet.</div>}
          {totalPages > 1 && <nav className="mt-10 flex items-center justify-center gap-2" aria-label="News pages"><button onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="min-h-11 rounded-lg border border-[var(--color-line)] px-4 text-sm font-semibold text-[var(--color-ink)] disabled:opacity-40">Previous</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? 'page' : undefined} className={`min-h-11 min-w-11 rounded-lg px-3 text-sm font-semibold ${currentPage === page ? 'bg-[var(--color-signal-dark)] text-white' : 'border border-[var(--color-line)] text-[var(--color-ink)]'}`}>{page}</button>)}<button onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="min-h-11 rounded-lg border border-[var(--color-line)] px-4 text-sm font-semibold text-[var(--color-ink)] disabled:opacity-40">Next</button></nav>}
        </div>
      </section>
      <section className="bg-[var(--color-ink)] py-12"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="text-2xl font-bold text-[var(--color-panel)]">Need a configuration recommendation?</h2><p className="mt-2 text-[var(--color-canvas)]">Share your operating conditions and destination port. We will help you structure the RFQ.</p></div><Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--color-signal)] px-5 font-semibold text-[var(--color-ink)] hover:bg-[var(--color-panel)]">Start an RFQ <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
    <Footer />
  </>
}

export const getStaticProps: GetStaticProps<{ items: NewsItem[] }> = async () => ({ props: { items: await getPublishedNews() } })
