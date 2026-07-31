import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import { SeoHead } from '@/components/seo/SeoHead'

export default function PrivacyPage() {
  return <div className="industrial-page"><SeoHead input={{ path: '/privacy', pageType: 'website', name: 'Privacy Notice', description: 'How SINOTRUK TEAM handles information submitted through product, parts and RFQ enquiries.' }} /><Header /><main id="main" className="pt-16 lg:pt-[72px]"><PageHero eyebrow="Legal" title="Privacy notice" description="How SINOTRUK TEAM handles information submitted through product, parts and RFQ enquiries." image="/images/reference/Service-Network.webp" /><article aria-label="Privacy notice document" className="mx-auto my-14 max-w-3xl border-t border-[var(--industrial-accent)] bg-[var(--industrial-surface)] px-6 py-10 sm:px-10 lg:my-20">
    <h2 className="[font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Information submitted with an enquiry</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">We use the contact details and procurement information you submit to respond to your enquiry and coordinate the requested commercial discussion.</p>
    <h2 className="mt-10 [font-family:var(--industrial-display)] text-3xl font-semibold uppercase">Data minimisation</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">Do not send sensitive personal data that is not necessary for a truck or parts RFQ. You may ask us to correct or remove enquiry information by contacting us through the RFQ page.</p>
    <h2 className="mt-10 [font-family:var(--industrial-display)] text-3xl font-semibold uppercase">External links</h2><p className="mt-5 leading-8 text-[var(--industrial-muted)]">Links to third-party sites are governed by their own privacy practices.</p>
    <Link href="/contact" className="industrial-home-text-link mt-10">Return to RFQ</Link>
  </article></main><Footer /></div>
}
