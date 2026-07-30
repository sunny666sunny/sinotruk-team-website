import Head from 'next/head';
import Link from 'next/link';
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
  return <div className="flex min-h-screen flex-col"><Head><title>Shortlist | SINOTRUK TEAM</title><meta name="description" content="Review selected commercial trucks and parts before submitting an RFQ." /></Head><Header /><main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]"><PageHero eyebrow="Procurement shortlist" title="Review selected vehicles and parts." description="Review saved catalogue items, then add configuration and shipping requirements to your RFQ." image="/images/products/Heavy-Truck.webp" /><section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">{selected.length ? <><div className="space-y-3">{selected.map((item) => <article key={item.id} className="flex items-center justify-between gap-4 border border-[var(--color-line)] bg-[var(--color-panel)] p-4"><div><p className="font-bold text-[var(--color-ink)]">{item.name}</p><p className="mt-1 text-sm text-[var(--color-steel)]">{item.id}</p></div><button type="button" onClick={() => remove(item.id)} className="min-h-11 text-sm font-bold text-[var(--color-signal-dark)]">Remove</button></article>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="bg-[var(--color-signal)] px-5 py-3 text-sm font-bold text-[var(--color-panel)] hover:bg-[var(--color-signal-dark)]">Continue to RFQ</Link><Link href="/products" className="border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-sm font-bold text-[var(--color-ink)]">Browse products</Link></div></> : <div className="border border-dashed border-[var(--color-line)] bg-[var(--color-panel)] p-10 text-center"><h2 className="text-xl font-bold text-[var(--color-ink)]">Your shortlist is empty.</h2><p className="mt-2 text-[var(--color-steel)]">Browse the catalogue to add vehicles or parts for your RFQ.</p><Link href="/products" className="mt-5 inline-flex text-sm font-bold text-[var(--color-signal-dark)]">Explore products</Link></div>}</section></main><Footer /></div>;
}
