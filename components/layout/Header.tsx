import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ShortlistButton from '@/components/procurement/ShortlistButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Parts', href: '/parts' },
    { name: 'Solutions', href: '/service' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="SINOTRUK TEAM home">
            <img
              src="/images/logo-cnhtc.webp"
              alt=""
              className="h-10 w-auto lg:h-11"
            />
            <span className="text-base font-extrabold tracking-[0.08em] text-[var(--color-ink)] sm:text-lg">
              SINOTRUK TEAM
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="rounded px-3 py-2 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-signal)]">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ShortlistButton className="hidden sm:inline-flex" />
            <Link href="/contact" className="hidden rounded-sm bg-[var(--color-signal)] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-signal-dark)] sm:inline-flex">
              Request a Quote
            </Link>
            <button
              className="rounded p-2 text-[var(--color-ink)] lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-primary-navigation"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--color-line)] bg-white lg:hidden">
          <nav id="mobile-primary-navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            <Link href="/products" className="rounded bg-[var(--color-canvas)] px-4 py-3 text-sm font-bold text-[var(--color-ink)]" onClick={() => setIsMenuOpen(false)}>
              Browse the catalogue
            </Link>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded px-4 py-3 text-sm font-semibold text-[var(--color-steel)] hover:bg-[var(--color-canvas)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <ShortlistButton className="px-4 py-3" onNavigate={() => setIsMenuOpen(false)} />
            <Link href="/contact" className="mt-2 rounded-sm bg-[var(--color-signal)] px-4 py-3 text-center text-sm font-bold text-white" onClick={() => setIsMenuOpen(false)}>
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
