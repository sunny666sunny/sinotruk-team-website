import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { newsItems } from '@/data/news'
import { ChevronRight, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'

export default function NewsDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  const newsItem = newsItems.find((item) => item.slug === slug)

  if (router.isFallback || !newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26807d]" />
      </div>
    )
  }

  const currentIndex = newsItems.findIndex((item) => item.slug === slug)
  const prevItem = currentIndex > 0 ? newsItems[currentIndex - 1] : null
  const nextItem = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null

  // Get related articles (same month or adjacent items excluding current)
  const relatedArticles = newsItems
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const contentParagraphs = newsItem.content.split('\n\n').filter((p: string) => p.trim())

  return (
    <>
      <Head>
        <title>{newsItem.seoTitle}</title>
        <meta name="description" content={newsItem.seoDescription} />
        <meta property="og:title" content={newsItem.seoTitle} />
        <meta property="og:description" content={newsItem.seoDescription} />
        <meta property="og:image" content={newsItem.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={newsItem.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={newsItem.seoTitle} />
        <meta name="twitter:description" content={newsItem.seoDescription} />
        <meta name="twitter:image" content={newsItem.image} />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-white transition-colors">News & Events</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate max-w-[200px]">{newsItem.title}</span>
            </div>
            <div className="flex items-center justify-center text-white/80 text-sm mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={newsItem.date}>{formatDate(newsItem.date)}</time>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white max-w-4xl mx-auto">
              {newsItem.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-12">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#26807d]">
            {contentParagraphs.map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6 text-gray-700 leading-relaxed text-lg">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Prev/Next Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-16 pt-8 border-t border-gray-200">
            {prevItem ? (
              <Link
                href={`/news/${prevItem.slug}`}
                className="group flex items-start space-x-3 text-left"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#26807d] mt-1 flex-shrink-0 transition-colors" />
                <div>
                  <span className="text-sm text-gray-400">Previous Article</span>
                  <p className="text-gray-700 group-hover:text-[#26807d] font-medium line-clamp-1 max-w-[300px] transition-colors">
                    {prevItem.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
            {nextItem ? (
              <Link
                href={`/news/${nextItem.slug}`}
                className="group flex items-start space-x-3 text-right sm:ml-auto"
              >
                <div>
                  <span className="text-sm text-gray-400">Next Article</span>
                  <p className="text-gray-700 group-hover:text-[#26807d] font-medium line-clamp-1 max-w-[300px] transition-colors">
                    {nextItem.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#26807d] mt-1 flex-shrink-0 transition-colors" />
              </Link>
            ) : <div />}
          </div>

          {/* Back to News */}
          <div className="text-center mt-8">
            <Link
              href="/news"
              className="inline-flex items-center text-[#26807d] font-semibold hover:text-[#1e6663] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All News
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#26807d]/30 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center text-gray-400 text-xs mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#26807d] transition-colors line-clamp-2 text-sm">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#26807d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Reliable Heavy-Duty Truck?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            SINOTRUK offers a complete range of HOWO trucks engineered for your toughest jobs. Get in touch with our team for expert advice and competitive pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-[#26807d] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const paths = newsItems.map((item) => ({
    params: { slug: item.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: {} }
}