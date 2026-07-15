import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import HeroBanner from '@/components/home/HeroBanner'
import CategorySection from '@/components/home/CategorySection'
import AboutSection from '@/components/home/AboutSection'
import TechAdvantages from '@/components/home/TechAdvantages'
import GlobalBusiness from '@/components/home/GlobalBusiness'
import IndustryApplications from '@/components/home/IndustryApplications'
import NewsSection from '@/components/home/NewsSection'
import AllProducts from '@/components/home/AllProducts'
import CTASection from '@/components/home/CTASection'
import { siteConfig } from '@/data/siteConfig'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        <HeroBanner />
        <CategorySection />
        <AboutSection />
        <TechAdvantages />
        <GlobalBusiness />
        <IndustryApplications />
        <NewsSection />
        <AllProducts />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  )
}
