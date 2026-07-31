import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

type ServiceSection = {
  title: string
  description: string
  image: string
  imageAlt: string
  bullets?: string[]
}

export default function ServicePageLayout({ title, description, sections }: { title: string; description: string; sections: ServiceSection[] }) {
  return <div className="industrial-page flex min-h-screen flex-col">
    <Head><title>{`${title} | SINOTRUK TEAM`}</title><meta name="description" content={description} /></Head>
    <Header />
    <main id="main" className="flex-grow pt-16 lg:pt-[72px]">
      <section className="relative isolate min-h-[380px] overflow-hidden border-b border-[var(--industrial-line)]">
        <SiteImage src="/images/reference/banner-ser.webp" alt="Commercial truck service facility" fill sizes="100vw" className="-z-20 object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,12,14,.96),rgba(3,12,14,.58)_55%,rgba(3,12,14,.18))]" />
        <div className="mx-auto flex min-h-[380px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/service" className="industrial-home-kicker w-fit border-b border-[var(--industrial-accent)] pb-1">Service / {title}</Link>
          <h1 className="mt-4 max-w-4xl [font-family:var(--industrial-display)] text-5xl font-bold uppercase leading-[.9] tracking-[-.045em] sm:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--industrial-muted)] sm:text-lg">{description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 border-b border-[var(--industrial-line)] pb-10 md:grid-cols-[auto_1fr]">
          <p className="industrial-home-kicker pt-2">Use the published process</p>
          <div><h2 className="[font-family:var(--industrial-display)] text-4xl font-semibold uppercase tracking-[-.035em]">Prepare the details each task needs.</h2><p className="mt-4 max-w-3xl leading-7 text-[var(--industrial-muted)]">Service information depends on the vehicle configuration and its actual condition. Share the model, VIN, part number or fault symptoms that are available; suitability and next steps must be confirmed for the individual enquiry.</p></div>
        </div>

        <ol aria-label="Service tasks" className="mt-12 space-y-16">
          {sections.map((section, index) => <li key={section.title} className="grid gap-7 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(22rem,.85fr)] lg:items-start">
            <span className="border-t border-[var(--industrial-accent)] pt-3 [font-family:var(--industrial-display)] text-4xl text-[var(--industrial-accent)]">0{index + 1}</span>
            <section className="pt-2">
              <h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase tracking-[-.02em]">{section.title}</h2>
              <p className="mt-4 leading-8 text-[var(--industrial-muted)]">{section.description}</p>
              {section.bullets && <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--industrial-muted)] sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="border-l border-[var(--industrial-accent)] pl-3">{bullet}</li>)}</ul>}
            </section>
            <figure className="relative aspect-[4/3] overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)]"><SiteImage src={section.image} alt={section.imageAlt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" /></figure>
          </li>)}
        </ol>

        <section className="mt-16 grid gap-6 border-y border-[var(--industrial-line)] py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div><h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Continue with your vehicle or parts details</h2><p className="mt-3 max-w-2xl leading-7 text-[var(--industrial-muted)]">Send the identifiers and operating context you have. The enquiry can then be reviewed against the published vehicle and parts information.</p></div>
          <div className="flex flex-wrap gap-5"><Link href="/contact" className="industrial-home-text-link">Request a quote <ArrowRight /></Link><Link href="/parts" className="industrial-home-text-link">Browse parts <ArrowRight /></Link></div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
}
