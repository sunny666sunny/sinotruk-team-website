import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { partCategories, productCategories, siteConfig } from '@/data/siteConfig'

type FooterLink = { name: string; href: string }

const aboutLinks: FooterLink[] = [
  { name: 'Who We Are', href: '/about/who-we-are' },
  { name: 'Our Journey', href: '/about/our-journey' },
  { name: 'Our Facilities', href: '/about/our-facilities' },
  { name: 'Social Responsibility', href: '/about/social-responsibility' },
]

const serviceLinks: FooterLink[] = [
  { name: 'After-sales Service', href: '/service/after-sales-service' },
  { name: 'Service Broadcast', href: '/service/service-broadcast' },
  { name: 'Maintenance Manual', href: '/service/maintenance-manual' },
]

export function IndustrialFooter() {
  return (
    <footer className="border-t border-[var(--industrial-line)] bg-[var(--industrial-bg)] text-[var(--industrial-text)]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 border-b border-[var(--industrial-line)] pb-14 lg:grid-cols-[1.25fr_2.75fr] lg:gap-16 lg:pb-20">
          <div>
            <Image src="/images/logo-cnhtc.webp" alt="SINOTRUK TEAM" width={800} height={795} className="h-12 w-auto brightness-0 invert" />
            <address className="mt-7 max-w-sm not-italic text-sm leading-7 text-[var(--industrial-muted)]">
              {siteConfig.contactInfo.address}
              <br />
              <a href={`tel:${siteConfig.contactInfo.phone.replace(/[^+\d]/g, '')}`} className="hover:text-[var(--industrial-accent)]">{siteConfig.contactInfo.phone}</a>
              <br />
              <a href={`mailto:${siteConfig.contactInfo.email}`} className="hover:text-[var(--industrial-accent)]">{siteConfig.contactInfo.email}</a>
            </address>
            <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center gap-3 bg-[var(--industrial-accent)] px-5 text-xs font-bold uppercase tracking-[0.08em] text-[#081113] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--industrial-text)]">
              Request Quote
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-4">
            <FooterColumn title="ABOUT US" links={aboutLinks} />
            <FooterColumn title="PRODUCTS" links={productCategories.map((category) => ({ name: category.name, href: `/products/${category.id}` }))} />
            <FooterColumn title="PARTS" links={partCategories.map((category) => ({ name: category.name, href: `/parts?tab=${category.id}` }))} />
            <div>
              <FooterColumn title="SERVICE" links={serviceLinks} />
              <ul className="mt-5 space-y-3 text-sm text-[var(--industrial-muted)]">
                <li><Link href="/news" className="flex min-h-11 items-center hover:text-[var(--industrial-accent)]">News</Link></li>
                <li><Link href="/video" className="flex min-h-11 items-center hover:text-[var(--industrial-accent)]">Video</Link></li>
                <li><Link href="/contact" className="flex min-h-11 items-center hover:text-[var(--industrial-accent)]">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs text-[var(--industrial-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SINOTRUK TEAM. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/privacy" className="hover:text-[var(--industrial-accent)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--industrial-accent)]">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[var(--industrial-accent)]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="[font-family:var(--industrial-display)] text-base font-semibold uppercase tracking-[0.1em] text-[var(--industrial-text)]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-[var(--industrial-muted)]">
        {links.map((link) => <li key={link.name}><Link href={link.href} className="flex min-h-11 items-center hover:text-[var(--industrial-accent)]">{link.name}</Link></li>)}
      </ul>
    </div>
  )
}
