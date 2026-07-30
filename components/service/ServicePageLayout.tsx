import Head from 'next/head';
import Link from 'next/link';
import { SiteImage } from '@/components/SiteImage';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

type ServiceSection = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  bullets?: string[];
};

export default function ServicePageLayout({ title, description, sections }: { title: string; description: string; sections: ServiceSection[] }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{title} | SINOTRUK TEAM</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]">
        <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
          <SiteImage src="/images/reference/banner-ser.webp" alt="Commercial truck service support" fill sizes="100vw" className="-z-20 object-cover opacity-40" priority />
          <div className="absolute inset-0 -z-10 bg-[var(--color-ink)]/60" />
          <div className="mx-auto max-w-6xl px-4 py-20 text-white sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-[0.12em] text-teal-100">SERVICE</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100">{description}</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {sections.map((section, index) => (
              <section key={section.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h2 className="text-3xl font-extrabold text-[var(--color-ink)]">{section.title}</h2>
                  <p className="mt-4 leading-8 text-[var(--color-steel)]">{section.description}</p>
                  {section.bullets && <ul className="mt-5 grid gap-2 text-sm leading-6 text-[var(--color-steel)] sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="border-l-2 border-[var(--color-signal)] pl-3">{bullet}</li>)}</ul>}
                </div>
                <div className={`relative aspect-[4/3] overflow-hidden bg-slate-100 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <SiteImage src={section.image} alt={section.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </section>
            ))}
          </div>
          <section className="mt-14 bg-[var(--color-ink)] px-6 py-10 text-white sm:px-10">
            <h2 className="text-2xl font-extrabold">Need product or parts information?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-200">Send your model, operating requirement, part number or VIN. Our team will route the enquiry to the appropriate support process.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="bg-[var(--color-signal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--color-signal-dark)]">Request a Quote</Link>
              <Link href="/parts" className="border border-white/50 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Browse Parts</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
