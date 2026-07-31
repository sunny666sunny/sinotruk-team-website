import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageHero from '@/components/layout/PageHero'
import { SiteImage } from '@/components/SiteImage'

const aboutPages = [
  { title: 'Who We Are', description: 'Explore the commercial-vehicle range, manufacturing background and product-development focus.', href: '/about/who-we-are', image: '/images/reference/Company-Profile-1.webp' },
  { title: 'Our Journey', description: 'Review the visual record of SINOTRUK commercial-vehicle development.', href: '/about/our-journey', image: '/images/reference/Company-Profile-2.webp' },
  { title: 'Our Facilities', description: 'See the manufacturing, assembly, inspection and testing environments in the published image archive.', href: '/about/our-facilities', image: '/images/reference/Company-Profile-3.webp' },
  { title: 'Social Responsibility', description: 'View the published social-responsibility programme image collection.', href: '/about/social-responsibility', image: '/images/reference/SOCIAL-RESPONSIBILITY-1.webp' },
]

export default function AboutPage() {
  return <div className="industrial-page flex min-h-screen flex-col">
    <Head><title>About SINOTRUK | SINOTRUK TEAM</title><meta name="description" content="Learn about SINOTRUK commercial vehicles, manufacturing background, facilities and social responsibility." /></Head>
    <Header />
    <main id="main" className="flex-grow pt-16 lg:pt-[72px]">
      <PageHero eyebrow="About Us" title="About SINOTRUK" description="SINOTRUK offers commercial vehicles for construction transport, long-distance logistics, urban distribution and specialised operations." image="/images/reference/about-SINOTRUK.webp" />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-8 lg:py-20">
        <div className="relative min-h-[28rem] overflow-hidden border border-[var(--industrial-line)]"><SiteImage src="/images/reference/about-SINOTRUK.webp" alt="SINOTRUK commercial vehicles at a facility" fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" /></div>
        <div className="flex flex-col justify-end border-t border-[var(--industrial-accent)] pt-8 lg:pb-8">
          <p className="industrial-home-kicker">Company overview</p>
          <h2 className="mt-4 [font-family:var(--industrial-display)] text-4xl font-semibold uppercase leading-none tracking-[-.035em] sm:text-5xl">Vehicle range, manufacturing and support context.</h2>
          <p className="mt-6 leading-8 text-[var(--industrial-muted)]">The published range covers heavy-duty trucks, light commercial vehicles, special vehicles, semi-trailers and new-energy vehicles for different operating requirements.</p>
          <p className="mt-4 leading-8 text-[var(--industrial-muted)]">The chapters below separate company background, the visual development archive, facilities and responsibility material.</p>
        </div>
      </section>
      <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end"><span className="industrial-home-kicker">Four chapters</span><h2 className="[font-family:var(--industrial-display)] text-4xl font-semibold uppercase tracking-[-.035em] sm:text-6xl">Explore About Us</h2></div>
          <ol aria-label="About chapters" className="mt-10 space-y-3">
            {aboutPages.map((page, index) => <li key={page.href}><Link href={page.href} className="group grid overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-bg)] md:grid-cols-[6rem_minmax(16rem,.8fr)_1.2fr_auto] md:items-center">
              <span className="p-5 [font-family:var(--industrial-display)] text-3xl text-[var(--industrial-accent)]">0{index + 1}</span>
              <div className="relative aspect-[16/9] min-h-48 overflow-hidden md:aspect-auto md:h-full"><SiteImage src={page.image} alt={page.title} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
              <div className="p-6"><h3 className="[font-family:var(--industrial-display)] text-2xl font-semibold uppercase tracking-[.02em]">{page.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--industrial-muted)]">{page.description}</p></div>
              <span className="m-5 inline-flex min-h-11 items-center gap-2 border-b border-[var(--industrial-accent)] text-sm font-semibold">View chapter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link></li>)}
          </ol>
        </div>
      </section>
    </main>
    <Footer />
  </div>
}
