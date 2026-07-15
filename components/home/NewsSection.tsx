import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { newsItems } from '@/data/news'

const latestNews = newsItems.slice(0, 3)

export default function NewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 inline-block pb-4">
            News & Events
          </h2>
          <p className="section-subtitle">
            Latest company updates and industry information
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <Link
              key={news.slug}
              href={`/news/${news.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover group"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {news.excerpt}
                </p>
                <span className="text-primary font-medium text-sm inline-flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/news" className="btn-outline inline-flex items-center space-x-2">
            <span>View All News</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
