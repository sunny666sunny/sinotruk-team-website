import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { parts, partCategories, getPartsByCategory } from '@/data/parts'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function PartsPage() {
  const router = useRouter()
  const { tab } = router.query
  const [activeTab, setActiveTab] = useState('engine')

  useEffect(() => {
    if (tab && typeof tab === 'string' && partCategories.some(c => c.id === tab)) {
      setActiveTab(tab)
    }
  }, [tab])

  const filteredParts = getPartsByCategory(activeTab)

  return (
    <>
      <Head>
        <title>Parts - SINOTRUK</title>
        <meta name="description" content="Your Home for All-Makes Truck Parts - Genuine SINOTRUK spare parts for heavy-duty trucks" />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/parts/banner-parts.webp"
          alt="SINOTRUK Parts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Parts</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Your Home for All-Makes Truck Parts
            </h1>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b sticky top-[80px] md:top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto -mb-px">
            {partCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === cat.id
                    ? 'border-[#26807d] text-[#26807d]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredParts.map((part) => (
              <Link
                key={part.id}
                href={`/parts/${part.id}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#26807d]/30 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-white relative overflow-hidden">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#26807d] transition-colors line-clamp-2">
                    {part.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{part.partNumber}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No parts found in this category.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#26807d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Genuine Truck Parts?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We supply genuine spare parts for all major Chinese truck brands. Contact us for bulk orders and competitive pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-[#26807d] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}