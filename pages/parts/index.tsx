import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { SiteImage } from '@/components/SiteImage';
import { SeoHead } from '@/components/seo/SeoHead';
import { parts, partCategories } from '@/data/parts';
import { filterParts } from '@/lib/procurement/filter-parts';

export default function PartsPage() {
  const router = useRouter();
  const [active, setActive] = useState('engine');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const tab = router.query.tab;
    if (typeof tab === 'string' && partCategories.some((category) => category.id === tab)) setActive(tab);
  }, [router.query.tab]);

  const visible = filterParts(parts, { category: active, query });

  return <>
    <SeoHead input={{ path: '/parts', pageType: 'website', name: 'Truck Parts Catalogue', description: 'Search available truck parts by part number, model and application, then submit your compatibility question.', image: '/images/parts/banner-parts.webp' }} />
    <Header />
    <main id="main" className="industrial-page pt-16 lg:pt-[72px]">
      <PageHero
        eyebrow="Parts catalogue"
        title="Identify the right component."
        description="Search published records by system, part number, model or application. Final compatibility is confirmed against your vehicle information."
        image="/images/parts/banner-parts.webp"
      />

      <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.45fr)] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Parts systems</p>
              <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Browse the published catalogue.</h2>
              <nav aria-label="Parts categories" className="mt-7 flex flex-wrap gap-2">
                {partCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active === category.id}
                    onClick={() => setActive(category.id)}
                    className={`min-h-11 border px-4 text-xs font-bold uppercase tracking-[0.08em] transition ${active === category.id ? 'border-[var(--industrial-accent)] bg-[var(--industrial-accent)] text-[#081113]' : 'border-[var(--industrial-line)] text-[var(--industrial-muted)] hover:border-[var(--industrial-accent)] hover:text-[var(--industrial-text)]'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>

            <label htmlFor="part-search" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--industrial-muted)]">
              Search catalogue
              <span className="relative mt-3 block">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--industrial-accent)]" />
                <input
                  id="part-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-describedby="parts-result-count"
                  placeholder="Part number, model or application"
                  className="min-h-12 w-full border border-[var(--industrial-line)] bg-[var(--industrial-bg)] py-3 pl-12 pr-4 text-sm normal-case tracking-normal text-[var(--industrial-text)] outline-none placeholder:text-[var(--industrial-muted)] focus:border-[var(--industrial-accent)] focus:ring-2 focus:ring-[var(--industrial-accent)]/25"
                />
              </span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-[var(--industrial-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">{partCategories.find((category) => category.id === active)?.name}</p>
              <h2 className="mt-2 text-3xl font-bold uppercase text-[var(--industrial-text)]">Available parts</h2>
            </div>
            <p id="parts-result-count" role="status" aria-live="polite" className="text-sm text-[var(--industrial-muted)]">{visible.length} parts match your current search.</p>
          </div>

          <div className="mt-7 grid gap-px overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((part) => (
              <Link key={part.id} href={`/parts/${part.id}`} className="group flex min-h-[21rem] min-w-0 flex-col bg-[var(--industrial-panel)] p-4 transition hover:bg-[#17292d] focus-visible:z-10">
                <span className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0b1517] p-5">
                  <SiteImage src={part.image} alt={`${part.name}, part number ${part.partNumber}`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]" />
                </span>
                <span className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">Part no. {part.partNumber}</span>
                <h3 className="mt-3 text-2xl font-bold uppercase leading-none text-[var(--industrial-text)]">{part.name}</h3>
                <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-muted)]">
                  View part details <ArrowRight aria-hidden="true" className="mb-0.5 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          {!visible.length && <div className="mt-7 border border-dashed border-[var(--industrial-line)] p-10 text-center text-[var(--industrial-muted)]">No matching parts. Try a different part number, model or category.</div>}
        </div>
      </section>

      <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold uppercase text-[var(--industrial-text)]">Need a compatibility review?</h2>
            <p className="mt-2 text-[var(--industrial-muted)]">Send the part number with your truck model or VIN. Compatibility is confirmed per enquiry.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Prepare an RFQ <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
