import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ShortlistButton from '@/components/procurement/ShortlistButton';
import { partCategories, productCategories } from '@/data/siteConfig';

type MenuLink = { name: string; href: string };

const aboutLinks: MenuLink[] = [
  { name: 'Who We Are', href: '/about/who-we-are' },
  { name: 'Our Journey', href: '/about/our-journey' },
  { name: 'Our Facilities', href: '/about/our-facilities' },
  { name: 'Social Responsibility', href: '/about/social-responsibility' },
];

const serviceLinks: MenuLink[] = [
  { name: 'After-sales Service', href: '/service/after-sales-service' },
  { name: 'Service Broadcast', href: '/service/service-broadcast' },
  { name: 'Maintenance Manual', href: '/service/maintenance-manual' },
];

function MenuCaret() {
  return <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />;
}

function StandardDropdown({ label, href, links }: { label: string; href: string; links: MenuLink[] }) {
  return (
    <div className="group relative">
      <Link href={href} className="flex items-center gap-1 rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]">
        {label}
        <MenuCaret />
      </Link>
      <div className="invisible absolute left-0 top-full w-60 border border-[var(--color-line)] bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="block rounded px-3 py-2.5 text-sm font-medium text-[var(--color-steel)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-signal)]">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductsDropdown() {
  return (
    <div className="group relative">
      <Link href="/products" className="flex items-center gap-1 rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]">
        Products
        <MenuCaret />
      </Link>
      <div className="invisible absolute left-1/2 top-full w-[min(900px,calc(100vw-2rem))] -translate-x-1/2 border border-[var(--color-line)] bg-white p-5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid grid-cols-3 gap-x-8 gap-y-5">
          {productCategories.map((category) => (
            <section key={category.id}>
              <Link href={`/products/${category.id}`} className="block border-b border-[var(--color-line)] pb-2 text-sm font-bold text-[var(--color-ink)] hover:text-[var(--color-signal)]">
                {category.name}
              </Link>
              <div className="mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <Link key={subcategory.id} href={`/products/${category.id}?tab=${subcategory.id}`} className="block py-1 text-xs font-medium text-[var(--color-steel)] hover:text-[var(--color-signal)]">
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function PartsDropdown() {
  return (
    <div className="group relative">
      <Link href="/parts" className="flex items-center gap-1 rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]">
        Parts
        <MenuCaret />
      </Link>
      <div className="invisible absolute left-0 top-full w-56 border border-[var(--color-line)] bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {partCategories.map((category) => (
          <Link key={category.id} href={`/parts?tab=${category.id}`} className="block rounded px-3 py-2.5 text-sm font-medium text-[var(--color-steel)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-signal)]">
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="SINOTRUK TEAM home">
            <img src="/images/logo-cnhtc.webp" alt="SINOTRUK TEAM" className="h-10 w-auto lg:h-11" />
          </Link>

          <nav className="hidden h-full items-center lg:flex" aria-label="Primary navigation">
            <Link href="/" className="rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)]">Home</Link>
            <StandardDropdown label="About Us" href="/about" links={aboutLinks} />
            <ProductsDropdown />
            <PartsDropdown />
            <Link href="/news" className="rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)]">News</Link>
            <Link href="/video" className="rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)]">Video</Link>
            <StandardDropdown label="Service" href="/service" links={serviceLinks} />
            <Link href="/contact" className="rounded px-3 py-6 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:text-[var(--color-signal)]">Contact Us</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ShortlistButton className="hidden xl:inline-flex" />
            <Link href="/contact" className="hidden rounded-sm bg-[var(--color-signal)] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-signal-dark)] xl:inline-flex">
              Request a Quote
            </Link>
            <button className="rounded p-2 text-[var(--color-ink)] lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-primary-navigation" aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--color-line)] bg-white lg:hidden">
          <nav id="mobile-primary-navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            <Link href="/" className="rounded px-4 py-3 text-sm font-bold text-[var(--color-ink)] hover:bg-[var(--color-canvas)]" onClick={closeMobileMenu}>Home</Link>
            <MobileGroup label="About Us" links={aboutLinks} onNavigate={closeMobileMenu} />
            <MobileProducts onNavigate={closeMobileMenu} />
            <MobileParts onNavigate={closeMobileMenu} />
            <Link href="/news" className="rounded px-4 py-3 text-sm font-semibold text-[var(--color-steel)] hover:bg-[var(--color-canvas)]" onClick={closeMobileMenu}>News</Link>
            <Link href="/video" className="rounded px-4 py-3 text-sm font-semibold text-[var(--color-steel)] hover:bg-[var(--color-canvas)]" onClick={closeMobileMenu}>Video</Link>
            <MobileGroup label="Service" links={serviceLinks} onNavigate={closeMobileMenu} />
            <Link href="/contact" className="rounded px-4 py-3 text-sm font-semibold text-[var(--color-steel)] hover:bg-[var(--color-canvas)]" onClick={closeMobileMenu}>Contact Us</Link>
            <ShortlistButton className="px-4 py-3" onNavigate={closeMobileMenu} />
            <Link href="/contact" className="mt-2 rounded-sm bg-[var(--color-signal)] px-4 py-3 text-center text-sm font-bold text-white" onClick={closeMobileMenu}>Request a Quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileGroup({ label, links, onNavigate }: { label: string; links: MenuLink[]; onNavigate: () => void }) {
  return (
    <details className="rounded hover:bg-[var(--color-canvas)]">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-[var(--color-steel)]">{label}</summary>
      <div className="border-l-2 border-[var(--color-line)] pb-2 pl-4">
        {links.map((link) => <Link key={link.name} href={link.href} className="block py-2 text-sm text-[var(--color-steel)] hover:text-[var(--color-signal)]" onClick={onNavigate}>{link.name}</Link>)}
      </div>
    </details>
  );
}

function MobileProducts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <details className="rounded hover:bg-[var(--color-canvas)]">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-[var(--color-steel)]">Products</summary>
      <div className="space-y-3 border-l-2 border-[var(--color-line)] pb-2 pl-4">
        {productCategories.map((category) => (
          <div key={category.id}>
            <Link href={`/products/${category.id}`} className="block py-1 text-sm font-bold text-[var(--color-ink)]" onClick={onNavigate}>{category.name}</Link>
            {category.subcategories.map((subcategory) => <Link key={subcategory.id} href={`/products/${category.id}?tab=${subcategory.id}`} className="block py-1 text-xs text-[var(--color-steel)] hover:text-[var(--color-signal)]" onClick={onNavigate}>{subcategory.name}</Link>)}
          </div>
        ))}
      </div>
    </details>
  );
}

function MobileParts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <details className="rounded hover:bg-[var(--color-canvas)]">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-[var(--color-steel)]">Parts</summary>
      <div className="border-l-2 border-[var(--color-line)] pb-2 pl-4">
        {partCategories.map((category) => <Link key={category.id} href={`/parts?tab=${category.id}`} className="block py-2 text-sm text-[var(--color-steel)] hover:text-[var(--color-signal)]" onClick={onNavigate}>{category.name}</Link>)}
      </div>
    </details>
  );
}
