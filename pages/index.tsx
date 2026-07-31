import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SeoHead } from '@/components/seo/SeoHead'
import { CatalogueMatrix } from '@/components/industrial/home/CatalogueMatrix'
import {
  ApplicationMatrix,
  BrandIdentitySection,
  CinematicHero,
  EditorialSection,
  EngineeringSection,
  FeaturedVehicleRail,
  FinalRfqSection,
  PartsEntrySection,
  ProcurementSupportSection,
} from '@/components/industrial/home/HomeSections'
import { productCategories } from '@/data/siteConfig'
import type { NewsItem } from '@/data/news'
import type { ProcurementProduct } from '@/lib/content/serializers'
import { getPublishedNews, getPublishedProducts } from '@/lib/content/repository'

type HomeProps = { news: NewsItem[]; products: ProcurementProduct[] }

export default function Home({ news, products }: HomeProps) {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead input={{ path: '/', pageType: 'website', name: 'SINOTRUK TEAM', description: 'Explore commercial truck and parts categories, compare requirements and start an export procurement enquiry with SINOTRUK TEAM.', image: '/images/products/Heavy-Truck.webp' }} />

      <Header transparent />

      <main id="main" className="industrial-page flex-grow">
        <CinematicHero products={featuredProducts.slice(0, 3)} />
        <CatalogueMatrix categories={productCategories} />
        <FeaturedVehicleRail products={featuredProducts.slice(0, 6)} />
        <BrandIdentitySection />
        <EngineeringSection />
        <ApplicationMatrix />
        <ProcurementSupportSection />
        <PartsEntrySection />
        <EditorialSection articles={news.slice(0, 4)} />
        <FinalRfqSection />
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const [publishedNews, products] = await Promise.all([
    getPublishedNews(),
    getPublishedProducts(),
  ])
  return { props: { news: publishedNews.slice(0, 4), products }, revalidate: 300 }
}
