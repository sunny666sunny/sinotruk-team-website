import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPartById, parts } from '@/data/parts'
import { ChevronRight, ArrowLeft, ShieldCheck, Package, Truck, RefreshCw } from 'lucide-react'
import { SeoHead } from '@/components/seo/SeoHead'

export default function PartDetailPage() {
  const router = useRouter()
  const { part } = router.query as { part: string }

  const partData = part ? getPartById(part) : undefined

  if (router.isFallback || !partData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#26807d]" />
      </div>
    )
  }

  const categoryMap: Record<string, string> = {
    'engine': 'Engine',
    'gearbox': 'Gearbox',
    'axle': 'Axle',
    'chassis': 'Chassis',
    'cabin-body': 'Cabin & Body',
    'other': 'Other',
  }

  return (
    <>
      <SeoHead input={{ path: `/parts/${part}`, pageType: 'part', name: `${partData.name} ${partData.partNumber}`, description: partData.description, image: partData.image, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Parts', path: '/parts' }, { name: partData.name, path: `/parts/${part}` }] }} />
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/parts/banner-parts.webp"
          alt="SINOTRUK Parts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/parts" className="hover:text-white transition-colors">Parts</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{partData.name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{partData.name}</h1>
            <p className="text-white/80 mt-2 text-lg">{partData.partNumber}</p>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-white rounded-xl p-8 flex items-center justify-center">
              <img
                src={partData.image}
                alt={partData.name}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm bg-[#26807d]/10 text-[#26807d] px-3 py-1 rounded-full">
                  {categoryMap[partData.category] || partData.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{partData.name}</h2>
              <p className="text-lg text-gray-500 mb-6">Part Number: {partData.partNumber}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{partData.description}</p>

              {/* Specifications */}
              <div className="border rounded-lg overflow-hidden">
                <h3 className="bg-gray-50 px-6 py-3 font-semibold text-gray-900 border-b">
                  Specifications
                </h3>
                <div className="divide-y">
                  {Object.entries(partData.specifications).map(([key, value]) => (
                    <div key={key} className="flex px-6 py-3">
                      <span className="text-gray-500 w-40 flex-shrink-0">{key}</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center mt-8 px-8 py-3 bg-[#26807d] text-white rounded-lg font-semibold hover:bg-[#1e6663] transition-colors"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-[#26807d]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Genuine Quality</h3>
              <p className="text-sm text-gray-500">100% authentic SINOTRUK OEM parts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#26807d]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Packaging</h3>
              <p className="text-sm text-gray-500">Professional export packing for safe delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[#26807d]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Shipping</h3>
              <p className="text-sm text-gray-500">Fast delivery to destinations worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-[#26807d]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">After-Sales Support</h3>
              <p className="text-sm text-gray-500">Dedicated support for all your parts needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-500 hover:text-[#26807d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Parts
        </button>
      </div>

      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const paths = parts.map((p) => ({
    params: { part: p.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: {} }
}
