import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { SeoHead } from '@/components/seo/SeoHead';

export default function NotFound() { return <><SeoHead input={{ path: '/404', pageType: 'website', name: 'Page not found', description: 'The requested SINOTRUK TEAM page could not be found.' }} /><Header /><main id="main" className="bg-[var(--color-canvas)]"><PageHero eyebrow="404" title="This page is not available." description="The link may be outdated. Browse the catalogue or return to the home page." image="/images/products/Light-Truck.webp" /><div className="mx-auto flex min-h-[40vh] max-w-2xl items-center px-4 py-12 sm:px-6"><div><p className="font-mono text-sm text-[var(--color-signal-dark)]">404</p><h2 className="mt-3 text-3xl font-bold text-[var(--color-ink)]">Continue browsing the catalogue.</h2><div className="mt-8 flex gap-4"><Link href="/products" className="bg-[var(--color-signal)] px-5 py-3 font-semibold text-[var(--color-ink)]">Browse products</Link><Link href="/" className="border border-[var(--color-line)] px-5 py-3 font-semibold text-[var(--color-ink)]">Home</Link></div></div></div></main><Footer /></>; }
