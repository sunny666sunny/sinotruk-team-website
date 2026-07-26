'use client'

import Link from 'next/link'
import { Product } from '@/data/products'
import { ChevronRight, Check } from 'lucide-react'
import SpecificationTable from '@/components/product/SpecificationTable'
import { addToShortlist, readShortlist, saveShortlist } from '@/lib/procurement/shortlist'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const bannerImage = product.bannerImage || product.image
  const addProductToShortlist = () => saveShortlist(addToShortlist(readShortlist(), product.id))

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width Banner */}
      <section className="relative w-full">
        <img
          src={bannerImage}
          alt={product.name}
          className="w-full object-cover max-h-[500px]"
        />
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/products/${product.category}`} className="hover:text-primary transition-colors">
              {product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Title & Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">{product.description}</p>
        </div>

        {/* Models Section - Image + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Models</h2>
            <SpecificationTable specifications={product.specifications} />
            <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={addProductToShortlist} className="border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-sm font-bold text-[var(--color-ink)]">Add to shortlist</button><Link href="/contact" className="bg-[var(--color-signal)] px-5 py-3 text-sm font-bold text-[var(--color-panel)] hover:bg-[var(--color-signal-dark)]">Request a Quote</Link></div>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[400px]"
            />
          </div>
        </div>

        {/* Detailed Features Section - Table */}
        {product.detailedFeatures && Object.keys(product.detailedFeatures).length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Features</h2>
            <SpecificationTable specifications={product.detailedFeatures} />
          </div>
        )}
      </div>

      {/* Performance Section */}
      {product.performanceItems && product.performanceItems.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">
              {product.performanceItems[0]?.description?.split('.')[0]}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.performanceItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">
              {product.name} always adheres to the customer-centered approach and continues to create value for customers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.galleryImages.map((img, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={img}
                    alt={`${product.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#26807d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your perfect truck?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us for the latest product information and professional consultation, our sales team will provide you with the most suitable solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#26807d] font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Request Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
