import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ChevronRight, ArrowRight, Wrench, Package, BookOpen, Headphones, Globe, Shield, Truck, Clock } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Vehicle Maintenance & Repair',
    description: 'Professional maintenance and repair services with certified technicians using genuine SINOTRUK parts and advanced diagnostic equipment.',
    features: ['Routine maintenance', 'Engine & transmission repair', 'Hydraulic system service', 'Electrical system diagnostics'],
  },
  {
    icon: Package,
    title: 'Genuine Parts Supply',
    description: 'Global distribution network providing authentic SINOTRUK spare parts with fast delivery to ensure minimal downtime.',
    features: ['OEM genuine parts', 'Global warehousing', 'Express delivery', 'Parts identification support'],
  },
  {
    icon: BookOpen,
    title: 'Technical Training',
    description: 'Comprehensive training programs for drivers, maintenance staff, and fleet managers to maximize vehicle performance and lifespan.',
    features: ['Driver operation training', 'Maintenance technician certification', 'Fleet management best practices', 'Online & on-site training'],
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Round-the-clock technical support and customer service to address any questions or issues, whenever you need assistance.',
    features: ['Multilingual support', 'Remote diagnostics', 'Emergency assistance', 'Warranty claim processing'],
  },
]

const advantages = [
  { icon: Globe, title: 'Global Service Network', desc: '3,770+ service points worldwide across major international logistics routes' },
  { icon: Shield, title: 'Quality Assurance', desc: 'ISO-certified service processes with strict quality control standards' },
  { icon: Truck, title: 'Rapid Response', desc: 'Mobile service units for on-site repairs and emergency roadside assistance' },
  { icon: Clock, title: 'Minimized Downtime', desc: 'Efficient service processes and readily available parts to keep your fleet running' },
]

export default function ServicePage() {
  return (
    <>
      <Head>
        <title>Service - SINOTRUK International</title>
        <meta name="description" content="SINOTRUK global service network - professional maintenance, genuine parts supply, technical training, and 24/7 support. With 3,770+ service points worldwide, we keep your fleet running." />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/about/banner-about.webp"
          alt="SINOTRUK Service"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Service</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Global Service Network
            </h1>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Comprehensive worldwide service coverage with 3,770+ service points, ensuring your trucks stay operational wherever you are
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete service solutions designed to maximize your fleet&apos;s performance, reliability, and return on investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg hover:border-[#26807d]/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-[#26807d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-[#26807d]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 bg-[#26807d] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence ensures your fleet receives the highest quality service support
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#26807d]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Global Service Coverage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete service network worldwide providing timely and professional support along major international logistics routes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { region: 'Asia-Pacific', desc: 'Extensive coverage across Southeast Asia, Australia, and Pacific Islands' },
              { region: 'Europe', desc: 'Service points throughout Eastern and Western Europe' },
              { region: 'Middle East', desc: 'Comprehensive network in GCC countries and Levant region' },
              { region: 'Africa', desc: 'Strong presence in East, West, and Southern Africa' },
              { region: 'North America', desc: 'Growing service network across US, Canada, and Mexico' },
              { region: 'South America', desc: 'Established service centers in key South American markets' },
            ].map((region) => (
              <div key={region.region} className="bg-gray-50 rounded-lg p-6 hover:bg-[#26807d]/5 transition-colors">
                <Globe className="w-8 h-8 text-[#26807d] mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{region.region}</h3>
                <p className="text-gray-500 text-xs">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#26807d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Service Support for Your Fleet?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Our global service team is ready to assist you. Contact us for maintenance, parts, or technical support inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-[#26807d] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Service Team
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}