import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import HeroBanner from '@/components/home/HeroBanner'
import CategorySection from '@/components/home/CategorySection'
import IndustryApplications from '@/components/home/IndustryApplications'
import NewsSection from '@/components/home/NewsSection'
import CTASection from '@/components/home/CTASection'
import ProcurementPaths from '@/components/home/ProcurementPaths'
import { productCategories } from '@/data/siteConfig'
import { getPublishedCategory } from '@/lib/content/repository'

type HomeProps = { categories: { id: string; name: string; description: string }[] };

export default function Home({ categories }: HomeProps) {
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
        <ProcurementPaths />
        <IndustryApplications />
        <NewsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const categories = await Promise.all(productCategories.map(async ({ id, name, description }) => {
    const record = await getPublishedCategory(id);
    return { id, name: record?.name ?? name, description: record?.description || description };
  }));
  return { props: { categories }, revalidate: 300 };
}
