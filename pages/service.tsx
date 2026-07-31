import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageHero from '@/components/layout/PageHero'
import { SiteImage } from '@/components/SiteImage'

const services = [
  { title: 'After-sales Service', description: 'Start with vehicle identity, condition and maintenance or repair context.', href: '/service/after-sales-service', image: '/images/reference/After-sales-service-3.webp', note: 'Vehicle, VIN and operating context' },
  { title: 'Service Broadcast', description: 'Review guidance for planned maintenance, diagnostics and parts identification.', href: '/service/service-broadcast', image: '/images/reference/After-sales-service-4.webp', note: 'Maintenance and diagnostic topics' },
  { title: 'Maintenance Manual', description: 'Prepare routine-check, repair and replacement-parts information.', href: '/service/maintenance-manual', image: '/images/reference/Parts-Accessories-1.webp', note: 'Checks, repair and parts references' },
]

export default function ServicePage() {
  return <div className="industrial-page flex min-h-screen flex-col">
    <Head><title>Service | SINOTRUK TEAM</title><meta name="description" content="Explore after-sales service, service broadcast and maintenance-manual information for SINOTRUK commercial vehicles." /></Head>
    <Header />
    <main id="main" className="flex-grow pt-16 lg:pt-[72px]">
      <PageHero eyebrow="Service" title="Service information" description="Find service, maintenance and parts-support information for commercial-truck operations." image="/images/reference/banner-ser.webp" />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 border-b border-[var(--industrial-line)] pb-10 lg:grid-cols-[.55fr_1fr]"><p className="industrial-home-kicker pt-2">Start with the task</p><div><h2 className="[font-family:var(--industrial-display)] text-4xl font-semibold uppercase tracking-[-.035em] sm:text-5xl">Use the route that matches the information you need.</h2><p className="mt-4 max-w-3xl leading-7 text-[var(--industrial-muted)]">Published service material is a starting point. Configuration, compatibility and service actions require the relevant vehicle details and individual confirmation.</p></div></div>
        <ol aria-label="Procurement service tasks" className="mt-12 space-y-4">
          {services.map((service, index) => <li key={service.href}><Link href={service.href} className="group grid overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)] md:grid-cols-[6rem_minmax(17rem,.8fr)_1.2fr_auto] md:items-center">
            <span className="p-5 [font-family:var(--industrial-display)] text-4xl text-[var(--industrial-accent)]">0{index + 1}</span>
            <div className="relative min-h-52 overflow-hidden"><SiteImage src={service.image} alt={service.title} fill sizes="(min-width: 768px) 34vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
            <div className="p-6"><p className="text-xs uppercase tracking-[.12em] text-[var(--industrial-accent)]">{service.note}</p><h3 className="mt-2 [font-family:var(--industrial-display)] text-3xl font-semibold uppercase">{service.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--industrial-muted)]">{service.description}</p></div>
            <span className="m-5 inline-flex min-h-11 items-center gap-2 border-b border-[var(--industrial-accent)] text-sm font-semibold">Open task <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link></li>)}
        </ol>
        <div className="mt-10 flex flex-wrap gap-5"><Link href="/contact" className="industrial-home-text-link">Request a quote <ArrowRight /></Link><Link href="/parts" className="industrial-home-text-link">Browse parts <ArrowRight /></Link></div>
      </section>
    </main>
    <Footer />
  </div>
}
