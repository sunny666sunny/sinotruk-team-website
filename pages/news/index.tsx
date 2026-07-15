import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { newsItems } from '@/data/news'
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react'

const ITEMS_PER_PAGE = 9

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE)
  
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return newsItems.slice(start, start + ITEMS_PER_PAGE)
  }, [currentPage])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <>
      <Head>
        <title>News & Events - SINOTRUK International</title>
        <meta name="description" content="Stay updated with the latest SINOTRUK news, product launches, industry insights, and heavy-duty truck information. Read about HOWO trucks, dump trucks, and commercial vehicle solutions." />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/news/banner-news.webp"
          alt="SINOTRUK News & Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">News & Events</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              News & Events
            </h1>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedItems.map((news) => (
              <article key={news.slug} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#26807d]/30 transition-all duration-300 group">
                <Link href={`/news/${news.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={news.date}>{formatDate(news.date)}</time>
                  </div>
                  <Link href={`/news/${news.slug}`} className="block group-hover:text-[#26807d] transition-colors">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3">
                      {news.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>
                  <Link
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center text-[#26807d] font-semibold text-sm hover:text-[#1e6663] transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#26807d] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#26807d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Ideal Truck?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Explore our complete range of HOWO heavy-duty trucks, dump trucks, tractors, and special vehicles. Contact our team for expert guidance and competitive pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-white text-[#26807d] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}