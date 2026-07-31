import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'

const features = [
  'Over 60 years of heavy-duty truck R&D and manufacturing experience',
  'Products exported to more than 100 countries and regions worldwide',
  'National-level enterprise technology center and post-doctoral research workstation',
  'Annual production capacity of over 300,000 vehicles',
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            About Sinotruk
          </h2>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
            China National Heavy Duty Truck Group Co., Ltd. (SINOTRUK) is the cradle of China&apos;s 
            heavy-duty automobile industry and a leading enterprise in the domestic heavy-duty truck sector.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg shadow-xl">
              <SiteImage
                src="/images/reference/about-SINOTRUK.webp"
                alt="SINOTRUK Facility"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-primary rounded-lg opacity-30"></div>
          </div>
          
          <div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              We always adhere to technological innovation as the driving force and customer needs 
              as the orientation to provide customers with high-quality products and excellent services.
            </p>
            
            <Link href="/about" className="btn-primary inline-flex items-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
