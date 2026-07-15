import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to find your perfect truck?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Contact us for the latest product information and professional consultation, 
          our sales team will provide you with the most suitable solution
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/contact" className="bg-white text-primary font-semibold px-8 py-4 rounded hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2">
            <span>Request Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/products" className="border-2 border-white text-white font-semibold px-8 py-4 rounded hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center space-x-2">
            <span>Browse Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
