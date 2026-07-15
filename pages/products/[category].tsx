import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { productCategories } from '@/data/siteConfig'
import { getProductsByCategory, type Product } from '@/data/products'

interface CategoryPageProps {
  category: {
    id: string
    name: string
    categoryDescription?: string
    description: string
    bannerImage?: string
    subcategories: { id: string; name: string }[]
  }
  products: Product[]
}

export default function ProductCategoryPage({ category, products }: CategoryPageProps) {
  const router = useRouter()
  const { category: categoryId, tab } = router.query
  const activeTab = (typeof tab === 'string' ? tab : 'all')

  const subcategoryIds = category.subcategories.map((s) => s.id)
  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((p) => p.subcategory === activeTab)

  const handleTabChange = (subId: string) => {
    const url = subId === 'all'
      ? `/products/${categoryId}`
      : `/products/${categoryId}?tab=${subId}`
    router.push(url, undefined, { shallow: false })
  }

  const categoryDescription =
    category.categoryDescription || category.description

  const bannerImage =
    category.bannerImage ||
    '/images/products/banner-pro.webp'

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{category.name} - SINOTRUK</title>
        <meta name="description" content={categoryDescription} />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="relative bg-black h-[400px] md:h-[500px]">
          <img
            src={bannerImage}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/15 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">{category.name}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {category.name}
              </h1>
              <p className="text-gray-200 text-lg max-w-3xl">
                {categoryDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Subcategory Filter Tabs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 py-4">
              <Link
                href={`/products/${categoryId}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('all')
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-[#26807d] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products/${categoryId}?tab=${sub.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange(sub.id)
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === sub.id
                      ? 'bg-[#26807d] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                        {product.description}
                      </p>
                      <Link
                        href={`/products/${category.id}/${product.subcategory}/${product.id}`}
                        className="inline-flex items-center text-[#26807d] hover:text-[#1e6663] font-medium text-sm transition-colors"
                      >
                        Read more
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#26807d] to-[#309a96]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your perfect truck?
            </h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              Explore our full range of heavy-duty trucks and find the perfect
              match for your business needs. Our experts are ready to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#26807d] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Request Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticPaths() {
  const paths = productCategories.map((cat) => ({
    params: { category: cat.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  const { category: categoryId } = params
  const category = productCategories.find((cat) => cat.id === categoryId)

  if (!category) {
    return {
      notFound: true,
    }
  }

  const products = getProductsByCategory(categoryId)

  return {
    props: {
      category: {
        id: category.id,
        name: category.name,
        categoryDescription: category.categoryDescription || null,
        description: category.description,
        bannerImage: category.bannerImage || null,
        subcategories: category.subcategories.map((sub) => ({
          id: sub.id,
          name: sub.name,
        })),
      },
      products,
    },
  }
}