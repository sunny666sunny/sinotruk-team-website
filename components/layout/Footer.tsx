import Link from 'next/link'
import { siteConfig, productCategories, partCategories } from '@/data/siteConfig'

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-ink)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-bold tracking-[0.12em] text-white">BUSINESS SCOPE</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">Vehicle selection, export-oriented configuration support, spare-parts sourcing and RFQ coordination for commercial-truck buyers.</p>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-bold text-white underline decoration-[var(--color-signal)] decoration-2 underline-offset-4 hover:text-slate-200">Start an enquiry</Link>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">PRODUCTS</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/products/${category.id}`} className="transition-colors hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">QUICK LINKS</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li><Link href="/products" className="transition-colors hover:text-white">All products</Link></li>
              <li><Link href="/parts" className="transition-colors hover:text-white">Parts centre</Link></li>
              <li><Link href="/service" className="transition-colors hover:text-white">Solutions</Link></li>
              <li><Link href="/news" className="transition-colors hover:text-white">News</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-white">About SINOTRUK TEAM</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            </ul>
            <h4 className="mt-7 text-sm font-bold tracking-[0.12em] text-white">PARTS</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300">
              {partCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/parts?tab=${category.id}`} className="transition-colors hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-[0.12em] text-white">CONTACT</h4>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>
                <p>{siteConfig.contactInfo.address}</p>
              </li>
              <li><a href={`tel:${siteConfig.contactInfo.phone.replace(/[^+\\d]/g, '')}`} className="transition-colors hover:text-white">{siteConfig.contactInfo.phone}</a></li>
              <li>
                <Link href={`mailto:${siteConfig.contactInfo.email}`} className="transition-colors hover:text-white">
                  {siteConfig.contactInfo.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} SINOTRUK TEAM. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
