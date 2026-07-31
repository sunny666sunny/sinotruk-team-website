import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { partCategories, productCategories } from '@/data/siteConfig'
import { activateDrawer, trapFocus } from '@/lib/ui/focus-trap'

type MenuLink = { name: string; href: string }

const aboutLinks: MenuLink[] = [
  { name: 'Who We Are', href: '/about/who-we-are' },
  { name: 'Our Journey', href: '/about/our-journey' },
  { name: 'Our Facilities', href: '/about/our-facilities' },
  { name: 'Social Responsibility', href: '/about/social-responsibility' },
]

const serviceLinks: MenuLink[] = [
  { name: 'After-sales Service', href: '/service/after-sales-service' },
  { name: 'Service Broadcast', href: '/service/service-broadcast' },
  { name: 'Maintenance Manual', href: '/service/maintenance-manual' },
]

const navLinkClass =
  'flex min-h-11 items-center border-b-2 border-transparent px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--industrial-muted)] transition-colors hover:text-[var(--industrial-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--industrial-accent)] xl:px-3 xl:text-xs'

export function IndustrialHeader({ transparent = false }: { transparent?: boolean }) {
  const router = useRouter()
  const drawerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const updateHeader = () => setIsScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [transparent])

  useEffect(() => {
    if (!isMenuOpen || !drawerRef.current) return
    return activateDrawer(drawerRef.current)
  }, [isMenuOpen])

  const closeMobileMenu = () => setIsMenuOpen(false)
  const handleDrawerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMobileMenu()
      return
    }
    if (drawerRef.current) trapFocus(event, drawerRef.current)
  }
  const isSolid = !transparent || isScrolled || isMenuOpen

  return (
    <>
      <a href="#main" className="industrial-skip-link">Skip to main content</a>
      <header className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-colors duration-200 ${isSolid ? 'border-[var(--industrial-line)] bg-[var(--industrial-bg)]' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--industrial-accent)]" aria-label="SINOTRUK TEAM home">
          <Image src="/images/logo-cnhtc.webp" alt="" width={800} height={795} className="h-10 w-auto brightness-0 invert lg:h-11" />
        </Link>

        <nav className="hidden h-full min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Primary navigation">
          <PrimaryLink href="/" label="Home" currentPath={router.pathname} />
          <DesktopDropdown label="About Us" href="/about" links={aboutLinks} currentPath={router.pathname} />
          <DesktopProducts currentPath={router.pathname} />
          <DesktopParts currentPath={router.pathname} />
          <PrimaryLink href="/news" label="News" currentPath={router.pathname} />
          <PrimaryLink href="/video" label="Video" currentPath={router.pathname} />
          <DesktopDropdown label="Service" href="/service" links={serviceLinks} currentPath={router.pathname} />
          <PrimaryLink href="/contact" label="Contact Us" currentPath={router.pathname} />
        </nav>

        <Link href="/contact" className="hidden min-h-11 shrink-0 items-center bg-[var(--industrial-accent)] px-4 text-xs font-bold uppercase tracking-[0.08em] text-[#081113] transition-colors hover:bg-[#48c4bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--industrial-text)] lg:inline-flex xl:px-5">
          Request Quote
        </Link>

        <button
          type="button"
          className="ml-auto grid min-h-11 min-w-11 place-items-center text-[var(--industrial-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)] lg:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-primary-navigation"
          aria-label="Open navigation"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-primary-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          onKeyDown={handleDrawerKeyDown}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[var(--industrial-bg)] text-[var(--industrial-text)] lg:hidden"
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--industrial-line)] px-4 sm:px-6">
            <span className="[font-family:var(--industrial-display)] text-lg font-bold uppercase tracking-[0.12em]">Navigation</span>
            <button type="button" onClick={closeMobileMenu} className="grid min-h-11 min-w-11 place-items-center border border-[var(--industrial-line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]" aria-label="Close navigation">
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6" aria-label="Mobile navigation">
            <MobileLink href="/" label="Home" onNavigate={closeMobileMenu} />
            <MobileGroup label="About Us" href="/about" links={aboutLinks} onNavigate={closeMobileMenu} />
            <MobileProducts onNavigate={closeMobileMenu} />
            <MobileParts onNavigate={closeMobileMenu} />
            <MobileLink href="/news" label="News" onNavigate={closeMobileMenu} />
            <MobileLink href="/video" label="Video" onNavigate={closeMobileMenu} />
            <MobileGroup label="Service" href="/service" links={serviceLinks} onNavigate={closeMobileMenu} />
            <MobileLink href="/contact" label="Contact Us" onNavigate={closeMobileMenu} />
            <Link href="/contact" onClick={closeMobileMenu} className="mt-6 flex min-h-12 items-center justify-center bg-[var(--industrial-accent)] px-5 text-sm font-bold uppercase tracking-[0.08em] text-[#081113] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--industrial-text)]">
              Request Quote
            </Link>
          </nav>
        </div>
      )}
      </header>
    </>
  )
}

function isCurrentPath(currentPath: string, href: string) {
  return href === '/' ? currentPath === href : currentPath.startsWith(href)
}

function PrimaryLink({ href, label, currentPath }: { href: string; label: string; currentPath: string }) {
  const current = isCurrentPath(currentPath, href)
  return <Link href={href} aria-current={current ? 'page' : undefined} className={`${navLinkClass} ${current ? 'border-[var(--industrial-accent)] text-[var(--industrial-text)]' : ''}`}>{label}</Link>
}

function DesktopDropdown({ label, href, links, currentPath }: { label: string; href: string; links: MenuLink[]; currentPath: string }) {
  const current = isCurrentPath(currentPath, href)
  return (
    <div className="group relative flex h-full items-center">
      <Link href={href} aria-current={current ? 'page' : undefined} className={`${navLinkClass} gap-1 ${current ? 'border-[var(--industrial-accent)] text-[var(--industrial-text)]' : ''}`}>
        {label}
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full w-64 border border-[var(--industrial-line)] bg-[var(--industrial-surface)] p-2 opacity-0 shadow-[0_18px_45px_rgb(0_0_0/0.28)] transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {links.map((link) => <Link key={link.name} href={link.href} className="block min-h-11 border-b border-[var(--industrial-line)] px-3 py-3 text-sm text-[var(--industrial-muted)] last:border-b-0 hover:bg-[var(--industrial-panel)] hover:text-[var(--industrial-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">{link.name}</Link>)}
      </div>
    </div>
  )
}

function DesktopProducts({ currentPath }: { currentPath: string }) {
  const current = isCurrentPath(currentPath, '/products')
  return (
    <div className="group flex h-full items-center">
      <Link href="/products" aria-current={current ? 'page' : undefined} className={`${navLinkClass} gap-1 ${current ? 'border-[var(--industrial-accent)] text-[var(--industrial-text)]' : ''}`}>
        Products
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>
      <div className="invisible absolute inset-x-0 top-full border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] opacity-0 shadow-[0_24px_55px_rgb(0_0_0/0.34)] transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-x-10 gap-y-7 px-8 py-8">
          {productCategories.map((category) => (
            <section key={category.id}>
              <Link href={`/products/${category.id}`} className="flex min-h-11 items-center justify-between border-b border-[var(--industrial-line)] [font-family:var(--industrial-display)] text-lg font-semibold uppercase tracking-[0.05em] text-[var(--industrial-text)] hover:text-[var(--industrial-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">
                {category.name}
                <span aria-hidden="true" className="text-[var(--industrial-accent)]">↗</span>
              </Link>
              <div className="mt-2 grid grid-cols-2 gap-x-4">
                {category.subcategories.map((subcategory) => (
                  <Link key={subcategory.id} href={`/products/${category.id}/${subcategory.id}`} className="flex min-h-11 items-center py-2 text-xs leading-5 text-[var(--industrial-muted)] hover:text-[var(--industrial-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function DesktopParts({ currentPath }: { currentPath: string }) {
  const links = partCategories.map((category) => ({ name: category.name, href: `/parts?tab=${category.id}` }))
  return <DesktopDropdown label="Parts" href="/parts" links={links} currentPath={currentPath} />
}

function MobileLink({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  return <Link href={href} onClick={onNavigate} className="flex min-h-12 items-center border-b border-[var(--industrial-line)] [font-family:var(--industrial-display)] text-xl font-semibold uppercase tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">{label}</Link>
}

function MobileGroup({ label, href, links, onNavigate }: { label: string; href: string; links: MenuLink[]; onNavigate: () => void }) {
  return (
    <details className="border-b border-[var(--industrial-line)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between [font-family:var(--industrial-display)] text-xl font-semibold uppercase tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">
        {label}
        <ChevronDown aria-hidden="true" className="h-5 w-5" />
      </summary>
      <div className="grid gap-1 pb-4 pl-4">
        <Link href={href} onClick={onNavigate} className="flex min-h-11 items-center text-sm font-semibold text-[var(--industrial-accent)]">View all {label}</Link>
        {links.map((link) => <Link key={link.name} href={link.href} onClick={onNavigate} className="flex min-h-11 items-center text-sm text-[var(--industrial-muted)] hover:text-[var(--industrial-text)]">{link.name}</Link>)}
      </div>
    </details>
  )
}

function MobileProducts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <details className="border-b border-[var(--industrial-line)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between [font-family:var(--industrial-display)] text-xl font-semibold uppercase tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">
        Products
        <ChevronDown aria-hidden="true" className="h-5 w-5" />
      </summary>
      <div className="space-y-3 pb-5 pl-4">
        <Link href="/products" onClick={onNavigate} className="flex min-h-11 items-center text-sm font-semibold text-[var(--industrial-accent)]">View all Products</Link>
        {productCategories.map((category) => (
          <details key={category.id} className="border-l border-[var(--industrial-line)] pl-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-bold text-[var(--industrial-text)]">
              {category.name}
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </summary>
            <div className="grid pb-2 pl-3">
              <Link href={`/products/${category.id}`} onClick={onNavigate} className="flex min-h-11 items-center text-xs font-semibold text-[var(--industrial-accent)]">View category</Link>
              {category.subcategories.map((subcategory) => <Link key={subcategory.id} href={`/products/${category.id}/${subcategory.id}`} onClick={onNavigate} className="flex min-h-11 items-center text-xs text-[var(--industrial-muted)]">{subcategory.name}</Link>)}
            </div>
          </details>
        ))}
      </div>
    </details>
  )
}

function MobileParts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <details className="border-b border-[var(--industrial-line)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between [font-family:var(--industrial-display)] text-xl font-semibold uppercase tracking-[0.06em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--industrial-accent)]">
        Parts
        <ChevronDown aria-hidden="true" className="h-5 w-5" />
      </summary>
      <div className="grid pb-4 pl-4">
        <Link href="/parts" onClick={onNavigate} className="flex min-h-11 items-center text-sm font-semibold text-[var(--industrial-accent)]">View all Parts</Link>
        {partCategories.map((category) => <Link key={category.id} href={`/parts?tab=${category.id}`} onClick={onNavigate} className="flex min-h-11 items-center text-sm text-[var(--industrial-muted)]">{category.name}</Link>)}
      </div>
    </details>
  )
}
