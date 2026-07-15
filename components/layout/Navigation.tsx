import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { productCategories } from '@/data/siteConfig'

export default function Navigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center space-x-1 py-1">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/products/${category.id}`}
                className="flex items-center space-x-1 px-4 py-3 hover:bg-primary transition-colors text-sm font-medium"
              >
                <span>{category.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Link>
              
              {activeCategory === category.id && (
                <div className="absolute top-full left-0 bg-white text-gray-800 rounded-b shadow-xl py-2 min-w-[200px] z-50">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/products/${category.id}/${sub.id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
