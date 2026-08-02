import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SeoHead } from '@/components/seo/SeoHead'

const mediaTopics = [
  { title: 'HOWO TX Tipper', image: '/images/products/Howo-TX-8x4-Tipper-Truck-1.webp', href: '/products/heavy-truck', note: 'Heavy-truck catalogue' },
  { title: 'HOWO NX Tractor', image: '/images/products/Howo-NX-Tractor-Truck.webp', href: '/products/heavy-truck', note: 'Tractor-truck range' },
  { title: 'HOWO TX Mixer', image: '/images/products/howo-TX-mixer-truck-1.webp', href: '/products/special-vehicle', note: 'Special-vehicle catalogue' },
  { title: 'Heavy Truck Range', image: '/images/products/Heavy-Truck.webp', href: '/products/heavy-truck', note: 'Vehicle range' },
  { title: 'Light Truck Range', image: '/images/products/Light-Truck.webp', href: '/products/light-truck', note: 'Vehicle range' },
  { title: 'New Energy Vehicle', image: '/images/products/New-Energy-Vehicle.webp', href: '/products/new-energy-vehicle', note: 'Vehicle range' },
]

export default function VideoPage() {
  return <div className="industrial-page flex min-h-screen flex-col">
    <SeoHead input={{ path: '/video', pageType: 'website', name: 'Video and Product Media', description: 'Explore commercial truck product imagery and request available media for a vehicle range.', image: '/images/reference/banner-ser.webp' }} />
    <Header />
    <main id="main" className="flex-grow pt-16 lg:pt-[72px]">
      <section className="relative isolate min-h-[350px] overflow-hidden border-b border-[var(--industrial-line)]">
        <SiteImage src="/images/reference/banner-ser.webp" alt="Commercial trucks in operation" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,12,14,.96),rgba(3,12,14,.58)_60%,rgba(3,12,14,.2))]" />
        <div className="mx-auto flex min-h-[350px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8"><p className="industrial-home-kicker">Product media</p><h1 className="mt-4 max-w-4xl [font-family:var(--industrial-display)] text-5xl font-bold uppercase leading-[.9] tracking-[-.05em] sm:text-7xl">Truck film and product media</h1><p className="mt-5 max-w-2xl leading-7 text-[var(--industrial-muted)]">Browse the real product covers currently available in the catalogue.</p></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 border-b border-[var(--industrial-line)] pb-10 lg:grid-cols-[.55fr_1fr]"><p className="industrial-home-kicker pt-2">Availability note</p><div><h2 className="[font-family:var(--industrial-display)] text-4xl font-semibold uppercase tracking-[-.035em]">No hosted video URL is currently published.</h2><p className="mt-4 max-w-3xl leading-7 text-[var(--industrial-muted)]">These covers link to the corresponding product ranges; they are not video players, and no reviews on SINOTRUK products are represented as videos here. Contact the team if you need currently available product media for a specific vehicle.</p></div></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {mediaTopics.map((topic, index) => <Link key={topic.title} href={topic.href} className={`group overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)] ${index < 2 ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
            <div className={`relative overflow-hidden ${index < 2 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}><SiteImage src={topic.image} alt={`${topic.title} product cover`} fill sizes={index < 2 ? '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
            <div className="p-5"><p className="text-xs uppercase tracking-[.1em] text-[var(--industrial-accent)]">{topic.note}</p><h2 className="mt-2 [font-family:var(--industrial-display)] text-2xl font-semibold uppercase">{topic.title}</h2><span className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-[var(--industrial-accent)] text-sm font-semibold">Open catalogue <ArrowRight className="h-4 w-4" /></span></div>
          </Link>)}
        </div>
        <div className="mt-12 flex flex-wrap gap-5"><Link href="/contact" className="industrial-home-text-link">Request available media <ArrowRight /></Link><Link href="/products" className="industrial-home-text-link">Browse all products <ArrowRight /></Link></div>
      </section>
    </main>
    <Footer />
  </div>
}
