import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { productCategories } from '@/data/siteConfig'

const categoryImages: Record<string, string> = {
  'heavy-truck': '/images/products/Heavy-Truck.webp',
  'light-truck': '/images/products/Light-Truck.webp',
  'special-vehicle': '/images/products/Special-Vehicle.webp',
  'light-vehicle': '/images/products/Light-Vehicle.webp',
  'semi-trailer': '/images/products/Semi-Trailer.webp',
  'new-energy-vehicle': '/images/products/New-Energy-Vehicle.webp',
}

export default function CategorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block pb-4 border-b-4 border-primary">
            WELCOME TO SINOTRUK
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto mt-6 text-lg leading-relaxed">
            SINOTRUK&apos;s products cover multiple fields, dedicated to meeting the needs of various users. 
            Our diverse range of models – from heavy-duty trucks to light commercial vehicles – serves 
            a wide spectrum of applications, including urban logistics, building and construction 
            transport, long-distance transportation, and specialized operations, ensuring we deliver 
            the optimal solution for every scenario.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/products/${category.id}`} className="block">
                <div className="h-52 bg-gray-100 relative overflow-hidden">
                  <img
                    src={categoryImages[category.id] || category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex justify-center space-x-3">
                  <Link
                    href={`/products/${category.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}