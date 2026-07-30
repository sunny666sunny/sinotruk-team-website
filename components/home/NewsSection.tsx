import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import type { NewsItem } from '@/data/news'
import { getNewsCategory } from '@/lib/content/news-presentation'

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export default function NewsSection({ items }: { items: NewsItem[] }) {
  return <section className="border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-16 lg:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.12em] text-[var(--color-signal-dark)]">Buyer knowledge centre</p><h2 className="mt-3 text-3xl font-bold tracking-[-.035em] text-[var(--color-ink)]">Recent procurement guidance.</h2></div><Link href="/news" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View all articles <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">{items.map((item) => <article key={item.slug} className="flex min-h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]"><Link href={`/news/${item.slug}`} className="relative aspect-[16/9] overflow-hidden bg-[var(--color-canvas)]"><SiteImage src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-300 hover:scale-[1.02]" /></Link><div className="flex flex-1 flex-col p-5"><div className="flex items-center gap-2 text-xs text-[var(--color-steel)]"><CalendarDays className="h-4 w-4" /><time dateTime={item.date}>{formatDate(item.date)}</time><span className="ml-auto font-semibold text-[var(--color-signal-dark)]">{getNewsCategory(item)}</span></div><h3 className="mt-4 text-lg font-bold tracking-[-.02em] text-[var(--color-ink)]"><Link href={`/news/${item.slug}`} className="hover:text-[var(--color-signal-dark)]">{item.title}</Link></h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-steel)]">{item.excerpt}</p><Link href={`/news/${item.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">Read article <ArrowRight className="h-4 w-4" /></Link></div></article>)}</div>
      {!items.length && <div className="mt-8 rounded-xl border border-dashed border-[var(--color-line)] p-8 text-sm text-[var(--color-steel)]">Published procurement guides will appear here.</div>}
    </div>
  </section>
}
