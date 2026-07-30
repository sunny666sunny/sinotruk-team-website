import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageHero from '@/components/layout/PageHero'
import { SiteImage } from '@/components/SiteImage'

const services = [
  { title: 'After-sales Service', description: 'Maintenance, technical training and parts-support information for commercial-truck operations.', href: '/service/after-sales-service', image: '/images/reference/After-sales-service-3.webp' },
  { title: 'Service Broadcast', description: 'Service guidance and support topics for routine maintenance, repair and operating checks.', href: '/service/service-broadcast', image: '/images/reference/After-sales-service-4.webp' },
  { title: 'Maintenance Manual', description: 'Practical maintenance, operating-check and parts-identification reference information.', href: '/service/maintenance-manual', image: '/images/reference/Parts-Accessories-1.webp' },
]

export default function ServicePage() {
  return <div className="flex min-h-screen flex-col">
    <Head>
      <title>Service | SINOTRUK TEAM</title>
      <meta name="description" content="Explore after-sales service, service broadcast and maintenance-manual information for SINOTRUK commercial vehicles." />
    </Head>
    <Header />
    <main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]">
      <PageHero eyebrow="Service" title="Service information" description="Find service, maintenance and parts-support information for commercial-truck operations." image="/images/reference/banner-ser.webp" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"><div className="grid gap-6 md:grid-cols-3">{services.map((service) => <Link key={service.href} href={service.href} className="group overflow-hidden border border-[var(--color-line)] bg-[var(--color-panel)] transition hover:border-[var(--color-signal-dark)] hover:shadow-[0_14px_30px_rgb(23_40_44_/_0.10)]"><div className="relative aspect-[4/3] overflow-hidden"><SiteImage src={service.image} alt={service.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div><div className="p-6"><h2 className="text-2xl font-bold tracking-[-.025em] text-[var(--color-ink)]">{service.title}</h2><p className="mt-3 leading-7 text-[var(--color-steel)]">{service.description}</p><span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div></section>
    </main>
    <Footer />
  </div>
}
