import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ChevronRight, ArrowRight, Globe, Users, Factory, Award } from 'lucide-react'

const timeline = [
  { year: '1960', desc: 'SINOTRUK produced China\'s first truck - Huanghe JN150 8T truck.', img: '/images/about/h1.webp' },
  { year: '1963', desc: 'The Huanghe 350 dump truck has been developed successfully.', img: '/images/about/h2.webp' },
  { year: '1978', desc: 'Roman trucks are assembled and produced using the SKD method. Over a decade leading to 1991, more than 8,000 Roman trucks were manufactured.', img: '/images/about/h3.webp' },
  { year: '1983', desc: 'SINOTRUK officially signs a contract with Austria\'s Steyr-Daimler-Puch AG for introducing the technology of Steyr 91 series heavy-duty truck, the first of its kind approved by the Chinese government.', img: '/images/about/h4.webp' },
  { year: '1985', desc: 'China\'s first Steyr truck rolls off the assembly line.', img: '/images/about/h5.webp' },
  { year: '2003', desc: 'SINOTRUK and Volvo signed the joint venture project on heavy trucks, and the joint venture company was established.', img: '/images/about/h6.webp' },
  { year: '2004', desc: 'The HOWO series heavy duty truck rolled off the production line, marking the beginning of the convergence of China\'s heavy-duty vehicle technology with the advanced international heavy-duty vehicle technology.', img: '/images/about/h7.webp' },
  { year: '2006', desc: 'An advanced heavy-duty vehicle engine production line has officially commenced operations, meeting international standards.', img: '/images/about/h8.webp' },
  { year: '2007', desc: 'SINOTRUK is listed on the main board of the HKSE as a red chip under the name "SINOTRUK (HK) Limited." This represents the company\'s starting point for entering the international capital market.', img: '/images/about/h9.webp' },
  { year: '2009', desc: 'SINOTRUK and MAN have entered an agreement for strategic cooperation, through which MAN has become a shareholder of SINOTRUK (Hong Kong) Limited.', img: '/images/about/h10.webp' },
  { year: '2013', desc: 'The first SITRAK heavy-duty truck, a joint effort between SINOTRUK and Germany\'s MAN, has officially rolled off the production line.', img: '/images/about/h11.webp' },
  { year: '2015', desc: 'China\'s exclusive National Heavy-duty Automotive Engineering Technology Research Center was completed.', img: '/images/about/h12.webp' },
  { year: '2016', desc: 'SINOTRUK has introduced its first-generation intelligent truck, featuring advanced driver assistance systems including EBS, ESC, AEBS, ACC, LDWS, and HSA.', img: '/images/about/h13.webp' },
  { year: '2018', desc: 'The world\'s first driverless electric truck made by SINOTRUK has started trial operations at Tianjin Port. It is equipped with the BeiDou Positioning System and features devices such as LiDAR, millimeter-wave radar, and cameras.', img: '/images/about/h14.webp' },
  { year: '2020', desc: 'Adhering to a forward-thinking R&D approach, SINOTRUK combines cutting-edge local and international technologies to redefine its high-end, homegrown brand. The brand-new, next-generation Huanghe heavy-duty truck has been officially unveiled in Ji\'nan.', img: '/images/about/h15.webp' },
]

const stats = [
  { icon: Globe, value: '150+', label: 'Countries & Regions Sold' },
  { icon: Users, value: '30,000+', label: 'Vehicles Operating Worldwide' },
  { icon: Factory, value: '1,500+', label: 'Global Dealer Networks' },
  { icon: Award, value: '3,770+', label: 'Global Service Networks' },
]

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - SINOTRUK International</title>
        <meta name="description" content="Learn about SINOTRUK - China's leading heavy-duty truck manufacturer with over 60 years of experience. Explore our journey, facilities, and global commitment to excellence." />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/about/banner-about.webp"
          alt="About SINOTRUK"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              About SINOTRUK
            </h1>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              China&apos;s leading heavy-duty truck manufacturer with over 60 years of experience in R&D, manufacturing, and global distribution
            </p>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              China National Heavy Duty Truck Group Co., Ltd.
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
              SINOTRUK is the cradle of China&apos;s heavy-duty automobile industry and a leading enterprise 
              in the domestic heavy-duty truck sector. With a comprehensive product portfolio covering 
              heavy-duty trucks, medium-duty trucks, light-duty trucks, special vehicles, and new energy 
              vehicles, SINOTRUK serves customers in over 100 countries and regions worldwide.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-[#26807d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#26807d]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#26807d]">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey - Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Adhering to a forward-thinking R&D approach, SINOTRUK combines cutting-edge local and 
              international technologies to redefine its high-end, homegrown brand.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#26807d]/20 transform md:-translate-x-0.5" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#26807d] rounded-full border-4 border-white shadow transform -translate-x-2 md:-translate-x-2 z-10" />

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="inline-block bg-[#26807d] text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
                      {item.year}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Image */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={item.img}
                        alt={`SINOTRUK ${item.year}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art manufacturing facilities equipped with advanced technology to ensure 
              the highest quality standards in every vehicle we produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/about/img30.webp"
                  alt="Manufacturing Facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Manufacturing</h3>
                <p className="text-gray-600">World-class production lines with automated welding, painting, and assembly systems ensuring precision and consistency.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/about/img31.webp"
                  alt="R&D Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">R&D Innovation Center</h3>
                <p className="text-gray-600">National-level enterprise technology center with post-doctoral research workstation driving continuous innovation.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/about/img32.webp"
                  alt="Quality Testing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Testing</h3>
                <p className="text-gray-600">Rigorous testing facilities including extreme environment simulation, durability testing, and comprehensive quality control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#26807d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Partner with China&apos;s Leading Truck Manufacturer
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            With over 60 years of excellence and a presence in 100+ countries, SINOTRUK is your trusted partner for heavy-duty truck solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-[#26807d] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}