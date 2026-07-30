import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/procurement/ProductFilters';
import CompareTray from '@/components/procurement/CompareTray';
import ComparisonTable from '@/components/procurement/ComparisonTable';
import { createComparison } from '@/lib/procurement/compare-products';
import { filterProducts } from '@/lib/procurement/filter-products';
import type { ProductFilterState } from '@/lib/procurement/types';
import { getPublishedProducts } from '@/lib/content/repository';
import type { ProcurementProduct } from '@/lib/content/serializers';

const fromQuery = (value: string | string[] | undefined) => typeof value === 'string' ? value.split(',').filter(Boolean) : [];

export default function Products({ products }: { products: ProcurementProduct[] }) {
  const router = useRouter();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const filters: ProductFilterState = { drive: fromQuery(router.query.drive), applications: fromQuery(router.query.application), powerMin: typeof router.query.powerMin === 'string' ? Number(router.query.powerMin) : undefined, powerMax: typeof router.query.powerMax === 'string' ? Number(router.query.powerMax) : undefined };
  const drives = useMemo(() => [...new Set(products.map((item) => item.normalizedSpecs.drive || item.normalizedSpecs['Drive type']).filter(Boolean))].sort(), [products]);
  const applications = useMemo(() => [...new Set(products.flatMap((item) => item.applicationTags))].sort(), [products]);
  const visible = filterProducts(products, filters);
  const updateFilters = (next: ProductFilterState) => { const query: Record<string, string> = {}; if (next.drive.length) query.drive = next.drive.join(','); if (next.applications.length) query.application = next.applications.join(','); if (next.powerMin !== undefined) query.powerMin = String(next.powerMin); if (next.powerMax !== undefined) query.powerMax = String(next.powerMax); void router.push({ pathname: '/products', query }, undefined, { shallow: true }); };
  const toggleCompare = (id: string) => setCompareIds((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; try { return createComparison(next); } catch { return current; } });
  const comparedProducts = products.filter((product) => compareIds.includes(product.id));
  return <div className="flex min-h-screen flex-col"><Head><title>Commercial Truck Catalogue | SINOTRUK TEAM</title><meta name="description" content="Filter commercial trucks by drive form, application and power range. Build a procurement shortlist or compare up to four vehicles." /></Head><Header /><main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]">
    <section className="relative isolate min-h-[320px] overflow-hidden bg-[var(--color-ink)] text-white"><img src="/images/products/Heavy-Truck.webp" alt="Commercial truck catalogue" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,39,.86),rgba(16,35,39,.25))]" /><div className="mx-auto flex min-h-[320px] max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[.14em] text-teal-100">Products</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Commercial Truck Catalogue</h1><p className="mt-3 max-w-2xl text-lg leading-7 text-slate-100">Compare available vehicle ranges, configurations and technical parameters before you enquire.</p></div></section>
    <section className="border-b border-[var(--color-line)] bg-white"><div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><p className="text-sm leading-7 text-[var(--color-steel)]">Use the available technical data to narrow the range. If a specification is not shown, include it in your RFQ for confirmation.</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8"><ProductFilters drives={drives} applications={applications} value={filters} onChange={updateFilters} /><div><div className="mb-5 flex items-center justify-between"><p className="text-sm text-[var(--color-steel)]">{visible.length} vehicles match your filters</p><p className="text-xs text-[var(--color-steel)]">Select up to four to compare</p></div>{visible.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visible.map((product) => <ProductCard key={product.id} product={product} compareSelected={compareIds.includes(product.id)} onCompareChange={toggleCompare} />)}</div> : <div className="border border-dashed border-[var(--color-line)] bg-white p-10 text-center"><p className="font-bold text-[var(--color-ink)]">No vehicles match these filters.</p><button type="button" onClick={() => updateFilters({ drive: [], applications: [] })} className="mt-4 text-sm font-bold text-[var(--color-signal)]">Reset filters</button></div>}</div></section>
    <CompareTray count={compareIds.length} onClear={() => setCompareIds([])} onCompare={() => setShowComparison(true)} />{showComparison && <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Vehicle comparison"><div className="mx-auto mt-10 max-w-6xl bg-white p-5 shadow-xl"><div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--color-signal)]">Selected vehicles</p><h2 className="mt-1 text-2xl font-extrabold text-[var(--color-ink)]">Compare specifications</h2></div><button type="button" onClick={() => setShowComparison(false)} className="text-sm font-bold text-[var(--color-ink)]">Close</button></div><ComparisonTable products={comparedProducts} /></div></div>}
  </main><Footer /></div>;
}

export async function getStaticProps() { return { props: { products: await getPublishedProducts() }, revalidate: 300 }; }
