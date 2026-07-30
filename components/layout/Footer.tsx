import Link from 'next/link';
import { partCategories, productCategories, siteConfig } from '@/data/siteConfig';

const aboutLinks = [
  { name: 'Who We Are', href: '/about/who-we-are' },
  { name: 'Our Journey', href: '/about/our-journey' },
  { name: 'Our Facilities', href: '/about/our-facilities' },
  { name: 'Social Responsibility', href: '/about/social-responsibility' },
];

const serviceLinks = [
  { name: 'After-sales Service', href: '/service/after-sales-service' },
  { name: 'Service Broadcast', href: '/service/service-broadcast' },
  { name: 'Maintenance Manual', href: '/service/maintenance-manual' },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-ink)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/images/logo-cnhtc.webp" alt="SINOTRUK TEAM" className="h-11 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">Vehicle selection, export-oriented configuration support, spare-parts sourcing and RFQ coordination for commercial-truck buyers.</p>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-bold text-white underline decoration-[var(--color-signal)] decoration-2 underline-offset-4 hover:text-slate-200">Start an enquiry</Link>
          </div>
          <FooterColumn title="ABOUT US" links={aboutLinks} />
          <FooterColumn title="PRODUCTS" links={productCategories.map((category) => ({ name: category.name, href: `/products/${category.id}` }))} />
          <FooterColumn title="PARTS" links={partCategories.map((category) => ({ name: category.name, href: `/parts?tab=${category.id}` }))} />
          <div>
            <FooterColumn title="SERVICE" links={serviceLinks} />
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li><Link href="/news" className="transition-colors hover:text-white">News</Link></li>
              <li><Link href="/video" className="transition-colors hover:text-white">Video</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 grid gap-4 border-t border-white/15 pt-6 text-sm text-slate-300 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-bold text-white">CONTACT US</p>
            <p className="mt-2 max-w-xl leading-6">{siteConfig.contactInfo.address}</p>
            <p className="mt-1"><a href={`tel:${siteConfig.contactInfo.phone.replace(/[^+\\d]/g, '')}`} className="hover:text-white">{siteConfig.contactInfo.phone}</a> · <a href={`mailto:${siteConfig.contactInfo.email}`} className="hover:text-white">{siteConfig.contactInfo.email}</a></p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">© {new Date().getFullYear()} SINOTRUK TEAM. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-[0.12em] text-white">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {links.map((link) => <li key={link.name}><Link href={link.href} className="transition-colors hover:text-white">{link.name}</Link></li>)}
      </ul>
    </div>
  );
}
