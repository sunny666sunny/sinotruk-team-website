import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, ExternalLink } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SiteImage } from '@/components/SiteImage'
import type { NewsItem } from '@/data/news'
import type { Product } from '@/data/products'
import { getPublishedNews, getPublishedNewsItem, getPublishedProducts } from '@/lib/content/repository'
import { getNewsCategory, getNewsSourceLabel } from '@/lib/content/news-presentation'
import { SeoHead } from '@/components/seo/SeoHead'

type RelatedProduct = Pick<Product, 'id' | 'name' | 'category' | 'subcategory' | 'image'>
type NewsDetailProps = { item: NewsItem; previous: NewsItem | null; next: NewsItem | null; related: NewsItem[]; relatedProducts: RelatedProduct[] }
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function NewsDetailPage({ item, previous, next, related, relatedProducts }: NewsDetailProps) {
  const sourceLabel = getNewsSourceLabel(item)
  const paragraphs = item.content.split('\n\n').filter((paragraph) => paragraph.trim())

  return <div className="industrial-page">
    <SeoHead input={{ path: `/news/${item.slug}`, pageType: 'article', name: item.seoTitle, description: item.seoDescription, image: item.image, datePublished: item.date, source: { title: item.sourceTitle, url: item.sourceUrl, datePublished: item.sourceDate }, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }, { name: item.title, path: `/news/${item.slug}` }] }} />
    <Header />
    <main id="main" className="pt-16 lg:pt-[72px]">
      <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-surface)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-12">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--industrial-muted)]" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight className="h-4 w-4" /><Link href="/news">News</Link><ChevronRight className="h-4 w-4" /><span className="max-w-64 truncate">{item.title}</span></nav>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[.1em] text-[var(--industrial-accent)]"><span>{getNewsCategory(item)}</span><time dateTime={item.date} className="inline-flex items-center gap-2 text-[var(--industrial-muted)]"><Calendar className="h-4 w-4" />{formatDate(item.date)}</time></div>
            <h1 className="mt-5 max-w-4xl [font-family:var(--industrial-display)] text-4xl font-bold uppercase leading-[.95] tracking-[-.045em] sm:text-6xl">{item.title}</h1>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--industrial-muted)]">{item.excerpt}</p>
          </div>
          <figure className="relative aspect-[16/10] overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-bg)]"><SiteImage src={item.image} alt={item.title} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" /></figure>
        </div>
      </section>

      <article className="py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,45rem)_minmax(17rem,1fr)] lg:px-8">
          <div className="space-y-6 text-[1.05rem] leading-8 text-[var(--industrial-text)]">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)}</div>
          <aside className="h-fit border-t border-[var(--industrial-accent)] bg-[var(--industrial-surface)] p-6 text-sm leading-6 text-[var(--industrial-muted)] lg:sticky lg:top-28">
            <h2 className="[font-family:var(--industrial-display)] text-2xl font-semibold uppercase text-[var(--industrial-text)]">Source information</h2>
            <p className="mt-3">{sourceLabel}</p>
            {item.sourceDate && <p className="mt-2">Source date: <time dateTime={item.sourceDate}>{formatDate(item.sourceDate)}</time></p>}
            {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[var(--industrial-accent)] font-semibold text-[var(--industrial-text)]">Open cited source <ExternalLink className="h-4 w-4" /></a>}
          </aside>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-4 border-t border-[var(--industrial-line)] px-4 pt-8 sm:grid-cols-2 sm:px-6 lg:px-8">{previous ? <Link href={`/news/${previous.slug}`} className="border border-[var(--industrial-line)] p-5 hover:border-[var(--industrial-accent)]"><span className="inline-flex items-center gap-2 text-xs uppercase tracking-[.1em] text-[var(--industrial-muted)]"><ArrowLeft className="h-4 w-4" />Previous</span><span className="mt-2 block font-semibold">{previous.title}</span></Link> : <div />}{next ? <Link href={`/news/${next.slug}`} className="border border-[var(--industrial-line)] p-5 text-right hover:border-[var(--industrial-accent)]"><span className="inline-flex items-center gap-2 text-xs uppercase tracking-[.1em] text-[var(--industrial-muted)]">Next<ArrowRight className="h-4 w-4" /></span><span className="mt-2 block font-semibold">{next.title}</span></Link> : <div />}</div>
      </article>

      {relatedProducts.length > 0 && <section aria-label="Related products" className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-5"><div><p className="industrial-home-kicker">Catalogue links</p><h2 className="mt-3 [font-family:var(--industrial-display)] text-4xl font-semibold uppercase">Related products</h2></div><Link href="/products" className="industrial-home-text-link">Browse catalogue <ArrowRight /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{relatedProducts.map((product) => <Link key={product.id} href={`/products/${product.category}/${product.subcategory}/${product.id}`} className="group border border-[var(--industrial-line)] bg-[var(--industrial-bg)]"><div className="relative aspect-[16/10] overflow-hidden"><SiteImage src={product.image} alt={product.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div><div className="p-5"><h3 className="[font-family:var(--industrial-display)] text-2xl font-semibold uppercase">{product.name}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--industrial-accent)]">View product <ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></div></section>}

      {related.length > 0 && <section className="py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="[font-family:var(--industrial-display)] text-4xl font-semibold uppercase">Continue your research</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((relatedItem) => <Link key={relatedItem.slug} href={`/news/${relatedItem.slug}`} className="border-t border-[var(--industrial-accent)] bg-[var(--industrial-surface)] p-5"><span className="text-xs uppercase tracking-[.1em] text-[var(--industrial-accent)]">{getNewsCategory(relatedItem)}</span><h3 className="mt-3 [font-family:var(--industrial-display)] text-2xl font-semibold uppercase">{relatedItem.title}</h3></Link>)}</div></div></section>}

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"><Link href="/news" className="industrial-home-text-link"><ArrowLeft /> Back to all articles</Link></div>
    </main>
    <Footer />
  </div>
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: (await getPublishedNews()).map((item) => ({ params: { slug: item.slug } })), fallback: false })

export const getStaticProps: GetStaticProps<NewsDetailProps> = async ({ params }) => {
  const slug = String(params?.slug || '')
  const [item, items, products] = await Promise.all([getPublishedNewsItem(slug), getPublishedNews(), getPublishedProducts()])
  if (!item) return { notFound: true }
  const index = items.findIndex((candidate) => candidate.slug === item.slug)
  const terms = `${item.title} ${item.excerpt} ${item.content} ${item.category || ''}`.toLowerCase()
  const relatedProducts = products.filter((product) => [product.name, product.category, product.subcategory].some((value) => terms.includes(value.replaceAll('-', ' ').toLowerCase()))).slice(0, 3).map(({ id, name, category, subcategory, image }) => ({ id, name, category, subcategory, image }))
  return { props: { item, previous: index > 0 ? items[index - 1] : null, next: index < items.length - 1 ? items[index + 1] : null, related: items.filter((candidate) => candidate.slug !== item.slug && getNewsCategory(candidate) === getNewsCategory(item)).slice(0, 3), relatedProducts } }
}
