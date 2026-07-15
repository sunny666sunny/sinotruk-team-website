import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useCallback } from 'react'
import { siteConfig, productCategories, partCategories } from '@/data/siteConfig'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback((name: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveDropdown(name)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }, [])

  const renderProductDropdown = () => (
    <div 
      className="fixed top-[80px] md:top-[88px] left-0 right-0 bg-white text-gray-800 shadow-2xl py-8 z-50"
      onMouseEnter={() => handleMouseEnter('products')}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6 gap-0">
          {productCategories.map((category, idx) => (
            <div 
              key={category.id} 
              className={`px-4 ${idx < productCategories.length - 1 ? 'border-r border-gray-100' : ''}`}
            >
              <Link
                href={`/products/${category.id}`}
                className="block text-primary font-bold text-base mb-5 pb-2 border-b-2 border-primary hover:opacity-80 transition-opacity"
              >
                {category.name}
              </Link>
              <ul className="space-y-3">
                {category.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/products/${category.id}`}
                      className="flex items-center justify-between hover:bg-gray-50 rounded p-2 transition-colors"
                    >
                      <span className="text-sm text-gray-600 whitespace-nowrap">{sub.name}</span>
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-14 h-10 object-cover rounded ml-3"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPartsDropdown = () => (
    <div 
      className="absolute top-full left-0 bg-white text-gray-800 shadow-2xl py-4 px-6 min-w-[250px] z-50"
      onMouseEnter={() => handleMouseEnter('parts')}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="space-y-1">
        {partCategories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/parts?tab=${category.id}`}
              className="block text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors py-3 px-4 rounded"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[80px] md:h-[88px]">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/logo-cnhtc.webp"
              alt="SINOTRUK"
              className="h-12 md:h-14 w-auto"
            />
            <span className="text-[#006b7a] font-bold text-xl md:text-2xl tracking-tight">
              SINOTRUK
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-0">
            {siteConfig.navLinks.map((link) => {
              if (link.name === 'Products') {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('products')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-primary font-medium transition-colors py-2 px-4 relative group flex items-center uppercase text-sm tracking-wide"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {activeDropdown === 'products' && renderProductDropdown()}
                  </div>
                )
              }
              if (link.name === 'Parts') {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('parts')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-primary font-medium transition-colors py-2 px-4 relative group flex items-center uppercase text-sm tracking-wide"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    {activeDropdown === 'parts' && renderPartsDropdown()}
                  </div>
                )
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors py-2 px-4 relative group uppercase text-sm tracking-wide"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            })}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="btn-primary hidden sm:inline-flex">
              GET QUOTE
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-2">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium py-3 px-4 rounded hover:bg-gray-50 uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-center mt-4">
              GET QUOTE
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}