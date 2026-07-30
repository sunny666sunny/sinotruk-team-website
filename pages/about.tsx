import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PageHero from '@/components/layout/PageHero'
import { SiteImage } from '@/components/SiteImage'

const aboutPages = [
  { title: 'Who We Are', description: 'Explore the commercial-vehicle range, manufacturing background and product-development focus.', href: '/about/who-we-are', image: '/images/reference/Company-Profile-1.webp' },
  { title: 'Our Journey', description: 'Review key milestones in the development of SINOTRUK commercial vehicles.', href: '/about/our-journey', image: '/images/reference/Company-Profile-2.webp' },
  { title: 'Our Facilities', description: 'See the manufacturing and testing environments behind the vehicle range.', href: '/about/our-facilities', image: '/images/reference/Company-Profile-3.webp' },
  { title: 'Social Responsibility', description: 'Learn about product safety, environmental responsibility and community initiatives.', href: '/about/social-responsibility', image: '/images/reference/Service-Network.webp' },
]

export default function AboutPage() {
  return <div className="flex min-h-screen flex-col">
    <Head>
      <title>About SINOTRUK | SINOTRUK TEAM</title>
      <meta name="description" content="Learn about SINOTRUK commercial vehicles, manufacturing background, facilities and social responsibility." />
    </Head>
    <Header />
    <main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]">
      <PageHero eyebrow="About Us" title="About SINOTRUK" description="SINOTRUK offers commercial vehicles for construction transport, long-distance logistics, urban distribution and specialised operations." image="/images/reference/about-SINOTRUK.webp" />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
        <div className="relative min-h-64 overflow-hidden bg-[var(--color-ink)]"><SiteImage src="/images/reference/about-SINOTRUK.webp" alt="SINOTRUK commercial vehicle facility" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div>
        <div className="self-center"><h2 className="text-3xl font-extrabold tracking-[-.035em] text-[var(--color-ink)]">Commercial vehicles for a wide range of operations.</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">From heavy-duty trucks to light commercial vehicles, the available range serves construction, logistics, specialised transport and other working applications.</p><p className="mt-4 leading-8 text-[var(--color-steel)]">Use the sections below to review the company background, development journey, facilities and responsibility information.</p></div>
      </section>
      <section className="border-t border-[var(--color-line)] bg-[var(--color-panel)] py-12 lg:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-extrabold tracking-[-.035em] text-[var(--color-ink)]">Explore About Us</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{aboutPages.map((page) => <Link key={page.href} href={page.href} className="group overflow-hidden border border-[var(--color-line)] bg-[var(--color-canvas)] transition hover:border-[var(--color-signal-dark)] hover:shadow-[0_14px_30px_rgb(23_40_44_/_0.10)]"><div className="relative aspect-[4/3] overflow-hidden"><SiteImage src={page.image} alt={page.title} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div><div className="p-5"><h3 className="text-xl font-bold text-[var(--color-ink)]">{page.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--color-steel)]">{page.description}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div></div></section>
    </main>
    <Footer />
  </div>
}
