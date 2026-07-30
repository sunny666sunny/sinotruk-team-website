import Link from 'next/link'
import type { ProcurementProduct } from '@/lib/content/serializers'

type CatalogueCategory = { id: string; name: string }

export default function AllProducts({ categories, products }: { categories: CatalogueCategory[]; products: ProcurementProduct[] }) {
  const productsByCategory = products.reduce<Record<string, ProcurementProduct[]>>((groups, product) => {
    groups[product.category] ??= []
    groups[product.category].push(product)
    return groups
  }, {})

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 inline-block pb-4">
            Product Categories
          </h2>
          <p className="section-subtitle">
            Browse our complete range of vehicle categories
          </p>
        </div>
        
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg p-6">
              <Link 
                href={`/products/${category.id}`}
                className="flex items-center space-x-3 mb-4 hover:text-primary transition-colors"
              >
                <span className="text-xl font-bold text-gray-900">{category.name}</span>
              </Link>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {(productsByCategory[category.id] || []).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.category}/${product.subcategory}/${product.id}`}
                    className="bg-white px-3 py-2 rounded text-center text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
