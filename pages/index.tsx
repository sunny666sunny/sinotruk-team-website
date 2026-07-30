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
import CTASection from '@/components/home/CTASection'
import ProcurementPaths from '@/components/home/ProcurementPaths'
import { productCategories } from '@/data/siteConfig'
import type { NewsItem } from '@/data/news'
import { getPublishedCategory, getPublishedNews } from '@/lib/content/repository'

type HomeProps = { categories: { id: string; name: string; description: string; image: string }[]; news: NewsItem[] };

export default function Home({ categories, news }: HomeProps) {
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
        <GlobalBusiness />
        <IndustryApplications />
        <NewsSection items={news} />
        <ProcurementPaths />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const categories = await Promise.all(productCategories.map(async ({ id, name, description, image }) => {
    const record = await getPublishedCategory(id);
    return { id, name: record?.name ?? name, description: record?.description || description, image: record?.bannerImage || image };
  }));
  const news = (await getPublishedNews()).slice(0, 3)
  return { props: { categories, news }, revalidate: 300 };
}
