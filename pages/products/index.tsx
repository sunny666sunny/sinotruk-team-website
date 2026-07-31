import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import ProductCategoryNavigation from '@/components/product/ProductCategoryNavigation';
import ProductFilters from '@/components/procurement/ProductFilters';
import CompareTray from '@/components/procurement/CompareTray';
import { CatalogueToolbar } from '@/components/industrial/catalogue/CatalogueToolbar';
import { CompareDialog } from '@/components/industrial/catalogue/CompareDialog';
import { IndustrialProductCard } from '@/components/industrial/catalogue/IndustrialProductCard';
import { FilterDrawer } from '@/components/ui/FilterDrawer';
import { createComparison } from '@/lib/procurement/compare-products';
import { filterProducts } from '@/lib/procurement/filter-products';
import type { ProductFilterState } from '@/lib/procurement/types';
import { getPublishedProducts } from '@/lib/content/repository';
import type { ProcurementProduct } from '@/lib/content/serializers';

const fromQuery = (value: string | string[] | undefined) => typeof value === 'string' ? value.split(',').filter(Boolean) : [];
const sortProducts = (products: ProcurementProduct[], sort: string) => sort === 'name-asc'
  ? [...products].sort((a, b) => a.name.localeCompare(b.name))
  : sort === 'name-desc'
    ? [...products].sort((a, b) => b.name.localeCompare(a.name))
    : products;

export default function Products({ products }: { products: ProcurementProduct[] }) {
  const router = useRouter();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [sort, setSort] = useState('featured');
  const filters: ProductFilterState = {
    drive: fromQuery(router.query.drive),
    applications: fromQuery(router.query.application),
    powerMin: typeof router.query.powerMin === 'string' ? Number(router.query.powerMin) : undefined,
    powerMax: typeof router.query.powerMax === 'string' ? Number(router.query.powerMax) : undefined,
  };
  const drives = useMemo(() => [...new Set(products.map((item) => item.normalizedSpecs.drive || item.normalizedSpecs['Drive type']).filter(Boolean))].sort(), [products]);
  const applications = useMemo(() => [...new Set(products.flatMap((item) => item.applicationTags))].sort(), [products]);
  const visible = sortProducts(filterProducts(products, filters), sort);
  const updateFilters = (next: ProductFilterState) => {
    const query: Record<string, string> = {};
    if (next.drive.length) query.drive = next.drive.join(',');
    if (next.applications.length) query.application = next.applications.join(',');
    if (next.powerMin !== undefined) query.powerMin = String(next.powerMin);
    if (next.powerMax !== undefined) query.powerMax = String(next.powerMax);
    void router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };
  const toggleCompare = (id: string) => setCompareIds((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try { return createComparison(next); } catch { return current; }
  });
  const comparedProducts = products.filter((product) => compareIds.includes(product.id));
  const filtersPanel = <ProductFilters drives={drives} applications={applications} value={filters} onChange={updateFilters} />;

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Commercial Truck Catalogue | SINOTRUK TEAM</title>
        <meta name="description" content="Filter commercial trucks by drive form, application and power range. Build a procurement shortlist or compare up to four vehicles." />
      </Head>
      <Header />
      <main id="main" className="industrial-page flex-grow pt-16 lg:pt-[72px]">
        <PageHero
          eyebrow="Products / Global catalogue"
          title="Commercial Truck Catalogue"
          description="Compare published vehicle ranges, configurations and technical parameters before you enquire."
          image="/images/products/Heavy-Truck.webp"
        />
        <ProductCategoryNavigation />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Procurement catalogue</p>
            <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Find the right platform.</h2>
            <p className="mt-4 leading-7 text-[var(--industrial-muted)]">
              Narrow the range using available technical data. Unlisted specifications remain subject to RFQ confirmation.
            </p>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <div className="hidden lg:block">{filtersPanel}</div>
            <div>
              <CatalogueToolbar count={visible.length} onOpenFilters={() => setFiltersOpen(true)} sort={sort} onSort={setSort} />
              {visible.length ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((product) => (
                    <IndustrialProductCard
                      key={product.id}
                      product={product}
                      compareSelected={compareIds.includes(product.id)}
                      onCompareChange={toggleCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 border border-dashed border-[var(--industrial-line)] p-10 text-center">
                  <p className="font-bold text-[var(--industrial-text)]">No vehicles match these filters.</p>
                  <button
                    type="button"
                    onClick={() => updateFilters({ drive: [], applications: [] })}
                    className="mt-4 min-h-11 text-sm font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filter vehicles">
          {filtersPanel}
        </FilterDrawer>
        <CompareTray count={compareIds.length} onClear={() => setCompareIds([])} onCompare={() => setShowComparison(true)} />
        <CompareDialog open={showComparison} onClose={() => setShowComparison(false)} products={comparedProducts} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: { products: await getPublishedProducts() }, revalidate: 300 };
}
