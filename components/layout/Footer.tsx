import Link from 'next/link'
import { siteConfig, productCategories, partCategories } from '@/data/siteConfig'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-6">PRODUCTS</h4>
            <ul className="space-y-3 text-gray-400">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/products/${category.id}`} className="hover:text-[#26807d] transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Parts */}
          <div>
            <h4 className="font-semibold text-lg mb-6">PARTS</h4>
            <ul className="space-y-3 text-gray-400">
              {partCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/parts?tab=${category.id}`} className="hover:text-[#26807d] transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">QUICK LINKS</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-[#26807d] transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-[#26807d] transition-colors">All Products</Link></li>
              <li><Link href="/parts" className="hover:text-[#26807d] transition-colors">Parts Center</Link></li>
              <li><Link href="/about" className="hover:text-[#26807d] transition-colors">About Us</Link></li>
              <li><Link href="/news" className="hover:text-[#26807d] transition-colors">News & Events</Link></li>
              <li><Link href="/service" className="hover:text-[#26807d] transition-colors">Service</Link></li>
              <li><Link href="/contact" className="hover:text-[#26807d] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">CONTACT INFO</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="text-white font-medium">Hong Kong Office</span>
                <p className="text-sm mt-1">Chinamerchant Tower Shuntak Centre</p>
                <p className="text-sm">168-200 Connaught Road Central, Hong Kong</p>
              </li>
              <li className="pt-3">
                <span className="text-white font-medium">Main Headquarters</span>
                <p className="text-sm mt-1">China National Heavy Duty Truck Group Co., Ltd.</p>
                <p className="text-sm">No. 777 Hua&apos;ao Road, High-tech Zone</p>
                <p className="text-sm">Jinan, Shandong, China</p>
              </li>
              <li className="pt-3">
                <Link href={`mailto:${siteConfig.contactInfo.email}`} className="hover:text-[#26807d] transition-colors">
                  {siteConfig.contactInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SINOTRUK International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}