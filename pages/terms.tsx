import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import { SeoHead } from '@/components/seo/SeoHead'

export default function TermsPage() {
  return <div className="industrial-page"><SeoHead input={{ path: '/terms', pageType: 'website', name: 'Website Terms', description: 'Terms for using the SINOTRUK TEAM catalogue, parts records and RFQ service.' }} /><Header /><main id="main" className="pt-16 lg:pt-[72px]"><PageHero eyebrow="Legal" title="Website terms" description="Terms for using the SINOTRUK TEAM catalogue, parts records and RFQ service." image="/images/products/Heavy-Truck.webp" /><article aria-label="Website terms document" className="mx-auto my-14 max-w-3xl border-t border-[var(--industrial-accent)] bg-[var(--industrial-surface)] px-6 py-10 sm:px-10 lg:my-20">
    <h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Catalogue information</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">Catalogue descriptions and specifications are provided as available reference information. Confirm configuration, compatibility, availability, commercial terms and shipment details for each enquiry.</p>
    <h2 className="mt-10 [font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Commercial confirmation</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">This website does not publish binding prices or make delivery, compatibility or stock guarantees. Parts compatibility may require a truck model or VIN.</p>
    <h2 className="mt-10 [font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Content use</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">Content may not be reused without permission. These terms may be updated as the site evolves.</p>
    <Link href="/products" className="industrial-home-text-link mt-10">Browse catalogue</Link>
  </article></main><Footer /></div>
}
