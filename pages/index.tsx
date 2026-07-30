import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import HeroBanner from '@/components/home/HeroBanner'
import CategorySection from '@/components/home/CategorySection'
import AboutSection from '@/components/home/AboutSection'
import TechAdvantages from '@/components/home/TechAdvantages'
import IndustryApplications from '@/components/home/IndustryApplications'
import NewsSection from '@/components/home/NewsSection'
import CTASection from '@/components/home/CTASection'
import AllProducts from '@/components/home/AllProducts'
import { productCategories } from '@/data/siteConfig'
import type { NewsItem } from '@/data/news'
import type { ProcurementProduct } from '@/lib/content/serializers'
import { getPublishedCategory, getPublishedNews, getPublishedProducts } from '@/lib/content/repository'

type CatalogueCategory = { id: string; name: string; description: string; image: string }
type HomeProps = { categories: CatalogueCategory[]; news: NewsItem[]; products: ProcurementProduct[] }

export default function Home({ categories, news, products }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>SINOTRUK TEAM | Commercial Truck Export Procurement</title>
        <meta name="description" content="Explore commercial truck and parts categories, compare requirements and start an export procurement enquiry with SINOTRUK TEAM." />
      </Head>
      
      <Header />
      
      <main className="flex-grow">
        <HeroBanner />
        <CategorySection categories={categories} />
        <AboutSection />
        <TechAdvantages />
        <IndustryApplications />
        <NewsSection items={news} />
        <AllProducts categories={categories} products={products} />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const [categories, publishedNews, products] = await Promise.all([
    Promise.all(productCategories.map(async ({ id, name, description, image }) => {
      const record = await getPublishedCategory(id)
      return { id, name: record?.name ?? name, description: record?.description || description, image: record?.bannerImage || image }
    })),
    getPublishedNews(),
    getPublishedProducts(),
  ])
  return { props: { categories, news: publishedNews.slice(0, 3), products }, revalidate: 300 }
}
