import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, FileText, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { allProducts } from '@/data/products';
import { parts } from '@/data/parts';
import { readShortlist, removeFromShortlist, saveShortlist } from '@/lib/procurement/shortlist';
import { resolveShortlist } from '@/lib/procurement/resolve-shortlist';

export default function ShortlistPage() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => setIds(readShortlist()), []);
  const selected = resolveShortlist(ids, allProducts, parts);
  const remove = (id: string) => { const next = removeFromShortlist(ids, id); saveShortlist(next); setIds(next); };

  return <div className="flex min-h-screen flex-col">
    <Head><title>Shortlist | SINOTRUK TEAM</title><meta name="description" content="Review selected commercial trucks and parts before submitting an RFQ." /></Head>
    <Header />
    <main id="main" className="industrial-page flex-grow pt-16 lg:pt-[72px]">
      <PageHero eyebrow="Procurement shortlist" title="Review selected vehicles and parts." description="Check the catalogue records you saved, then add configuration, compatibility and shipping details to your RFQ." image="/images/products/Heavy-Truck.webp" />
      <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-bg)]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          {selected.length ? <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Saved catalogue records</p>
                <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)]">Your RFQ shortlist</h2>
              </div>
              <p aria-live="polite" className="text-sm text-[var(--industrial-muted)]">{selected.length} selected item(s)</p>
            </div>
            <div className="mt-8 space-y-px bg-[var(--industrial-line)]">
              {selected.map((item) => {
                const partNumber = 'partNumber' in item ? item.partNumber : null;
                return <article key={item.id} className="flex min-w-0 flex-col gap-5 bg-[var(--industrial-panel)] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--industrial-accent)]">{partNumber ? 'Truck part' : 'Vehicle'}</p>
                    <h3 className="mt-2 break-words text-2xl font-bold uppercase leading-none text-[var(--industrial-text)]">{item.name}</h3>
                    <p className="mt-3 break-words font-mono text-xs text-[var(--industrial-muted)]">{partNumber ? `Part no. ${partNumber}` : item.id}</p>
                  </div>
                  <button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.name} from shortlist`} className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-muted)] hover:text-[var(--industrial-accent)] sm:self-auto">
                    <Trash2 aria-hidden="true" className="h-4 w-4" />Remove
                  </button>
                </article>;
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Continue to RFQ <FileText aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--industrial-line)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-text)]">Browse products <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/parts" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--industrial-line)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-text)]">Browse parts <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </> : <div className="border border-dashed border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-8 text-center sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Procurement shortlist</p>
            <h2 className="mt-3 text-3xl font-bold uppercase text-[var(--industrial-text)]">Your shortlist is empty.</h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--industrial-muted)]">Browse the catalogue to add vehicles or parts for your RFQ.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Explore products</Link>
              <Link href="/parts" className="inline-flex min-h-12 items-center justify-center border border-[var(--industrial-line)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-text)]">Explore parts</Link>
            </div>
          </div>}
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
