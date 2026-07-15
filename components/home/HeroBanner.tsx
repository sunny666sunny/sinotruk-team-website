import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative h-[700px] md:h-[800px] lg:h-[900px] overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/products/Heavy-Truck.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-800/40 to-gray-800/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-primary">SINOTRUK</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            SINOTRUK&apos;s products cover multiple fields, dedicated to meeting the needs of various users. 
            From heavy-duty trucks to light commercial vehicles – we deliver the optimal solution for every scenario.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/products" className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center space-x-2 text-lg px-8 py-4 rounded font-semibold">
              <Play className="w-5 h-5" />
              <span>Get Quote</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-light to-primary"></div>
    </section>
  )
}
