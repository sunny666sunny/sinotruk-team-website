import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight } from 'lucide-react'
import { productCategories, allProductsByCategory } from '@/data/siteConfig'

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Products - SINOTRUK</title>
        <meta name="description" content="SINOTRUK offers a complete range of customized solutions for every transportation need – from long-haul or short-haul transportation, urban or intercity logistics, or specialized work scenarios" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="relative bg-gray-900 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/products/banner-pro.webp"
              alt="Products Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-900/20 to-gray-900/30"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[400px] md:h-[500px] flex flex-col">
            {/* Breadcrumb */}
            <div className="pt-6">
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400">Products</span>
              </nav>
            </div>
            
            {/* Title */}
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">PRODUCTS</h1>
            </div>
          </div>
        </section>

        {/* Product Category Cards */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Customized Transportation Solutions</h2>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                SINOTRUK offers a complete range of customized solutions for every transportation need – from long-haul or short-haul transportation, urban or intercity logistics, or specialized work scenarios
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                >
                  {/* Category Header with Icon */}
                  <div className="p-6 pb-0">
                    <div className="flex items-center space-x-3 mb-4">
                      {category.icon && (
                        <img
                          src={category.icon}
                          alt={category.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      )}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="px-6">
                    <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/images/products/banner-pro.webp'
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-4">
                    <p className="text-primary font-semibold text-sm mb-2">{category.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{category.fullDescription}</p>
                    <Link
                      href={`/products/${category.id}`}
                      className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-primary transition-colors group/link"
                    >
                      <span>All Vehicle Details</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories List Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
              <p className="text-gray-600 text-lg">Browse our complete range of vehicle categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProductsByCategory.map((cat) => (
                <div key={cat.category} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
                    {cat.category}
                  </h3>
                  <ul className="space-y-2">
                    {cat.products.map((product, idx) => (
                      <li key={idx}>
                        <Link
                          href={product.href}
                          className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline underline-offset-2"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
