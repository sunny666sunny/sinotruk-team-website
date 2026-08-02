import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { SeoHead } from '@/components/seo/SeoHead'

type ImageItem = { src: string; alt: string; label?: string }

const imageSizes = '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw'

export default function AboutPageLayout({ title, description, children, gallery = [], path }: { title: string; description: string; children: React.ReactNode; gallery?: ImageItem[]; path?: string }) {
  const isJourney = title === 'Our Journey'
  const isFacilities = title === 'Our Facilities'
  const canonicalPath = path || `/about/${title.toLowerCase().replaceAll(' ', '-')}`

  return <div className="industrial-page flex min-h-screen flex-col">
    <SeoHead input={{ path: canonicalPath, pageType: 'website', name: title, description, image: '/images/reference/banner-about-1.webp' }} />
    <Header />
    <main id="main" className="flex-grow pt-16 lg:pt-[72px]">
      <section className="relative isolate min-h-[360px] overflow-hidden border-b border-[var(--industrial-line)]">
        <SiteImage src="/images/reference/banner-about-1.webp" alt="Commercial truck manufacturing facility" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,12,14,.96),rgba(3,12,14,.62)_48%,rgba(3,12,14,.2))]" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/about" className="industrial-home-kicker w-fit border-b border-[var(--industrial-accent)] pb-1">About / {title}</Link>
          <h1 className="mt-4 max-w-4xl [font-family:var(--industrial-display)] text-5xl font-bold uppercase leading-[.92] tracking-[-.045em] sm:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--industrial-muted)] sm:text-lg">{description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">{children}</div>

        {isJourney && gallery.length > 0 && <ol aria-label="Development timeline" className="mt-14 space-y-12 border-l border-[var(--industrial-line)] pl-5 sm:pl-10">
          {gallery.map((image, index) => <li key={image.src} className="relative grid gap-5 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-10">
            <span className="absolute -left-[1.55rem] top-0 h-3 w-3 bg-[var(--industrial-accent)] sm:-left-[2.83rem]" aria-hidden="true" />
            <div className="pt-1 [font-family:var(--industrial-display)] text-2xl font-semibold uppercase tracking-[.08em] text-[var(--industrial-muted)]">Chapter {String(index + 1).padStart(2, '0')}</div>
            <figure className={`grid overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)] ${index % 2 ? 'lg:grid-cols-[.8fr_1.2fr]' : 'lg:grid-cols-[1.2fr_.8fr]'}`}>
              <div className={`relative min-h-64 ${index % 2 ? 'lg:order-2' : ''}`}><SiteImage src={image.src} alt={image.alt} fill sizes={imageSizes} className="object-cover" /></div>
              <figcaption className="flex items-end p-6 text-sm leading-6 text-[var(--industrial-muted)]">{image.label || `Archive frame ${String(index + 1).padStart(2, '0')}`}</figcaption>
            </figure>
          </li>)}
        </ol>}

        {isFacilities && gallery.length > 0 && <ul aria-label="Manufacturing facilities gallery" className="mt-14 grid auto-rows-[13rem] gap-3 md:grid-cols-2 lg:grid-cols-4">
          {gallery.map((image, index) => <li key={image.src} className={`group relative isolate overflow-hidden border border-[var(--industrial-line)] ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : index % 5 === 0 ? 'lg:col-span-2' : ''}`}>
            <SiteImage src={image.src} alt={image.alt} fill sizes={imageSizes} className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#051012]/90 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 [font-family:var(--industrial-display)] text-lg font-semibold uppercase tracking-[.04em]">{image.label}</span>
          </li>)}
        </ul>}

        {!isJourney && !isFacilities && gallery.length > 0 && <section aria-label={`${title} image gallery`} className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {gallery.map((image, index) => <figure key={image.src} className={`overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-surface)] ${index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
            <div className="relative aspect-[4/3]"><SiteImage src={image.src} alt={image.alt} fill sizes={imageSizes} className="object-cover" /></div>
            {image.label && <figcaption className="p-4 text-sm text-[var(--industrial-muted)]">{image.label}</figcaption>}
          </figure>)}
        </section>}

        <section className="mt-16 grid gap-6 border-y border-[var(--industrial-line)] py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div><h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase tracking-[-.02em]">Continue with the catalogue</h2><p className="mt-3 max-w-2xl leading-7 text-[var(--industrial-muted)]">Review the published vehicle and parts records, then send the operating requirements that need confirmation.</p></div>
          <div className="flex flex-wrap gap-5"><Link href="/products" className="industrial-home-text-link">Browse products <ArrowRight /></Link><Link href="/contact" className="industrial-home-text-link">Request a quote <ArrowRight /></Link></div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
}
