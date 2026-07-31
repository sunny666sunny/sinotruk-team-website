import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import ProductFilters from '@/components/procurement/ProductFilters';
import CompareTray from '@/components/procurement/CompareTray';
import ComparisonTable from '@/components/procurement/ComparisonTable';
import { CatalogueToolbar } from '@/components/industrial/catalogue/CatalogueToolbar';
import { IndustrialProductCard, toCatalogueProduct } from '@/components/industrial/catalogue/IndustrialProductCard';
import { FilterDrawer } from '@/components/ui/FilterDrawer';
import { SeoHead } from '@/components/seo/SeoHead';
import { productCategories } from '@/data/siteConfig';
import { getProductsBySubcategory } from '@/data/products';
import { createComparison } from '@/lib/procurement/compare-products';
import { filterProducts } from '@/lib/procurement/filter-products';
import type { ProductFilterState } from '@/lib/procurement/types';
import type { ProcurementProduct } from '@/lib/content/serializers';

type Props = {
  category: { id: string; name: string; bannerImage: string };
  subcategory: { id: string; name: string; image: string };
  products: ProcurementProduct[];
};

export default function ProductSubcategoryPage({ category, subcategory, products }: Props) {
  const path = `/products/${category.id}/${subcategory.id}`;
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<ProductFilterState>({ drive: [], applications: [] });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [sort, setSort] = useState('featured');
  const drives = useMemo(() => [...new Set(products.map((item) => item.normalizedSpecs.drive || item.normalizedSpecs['Drive type']).filter(Boolean))].sort(), [products]);
  const applications = useMemo(() => [...new Set(products.flatMap((item) => item.applicationTags))].sort(), [products]);
  const filtered = filterProducts(products, filters);
  const visible = sort === 'name-asc'
    ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    : sort === 'name-desc'
      ? [...filtered].sort((a, b) => b.name.localeCompare(a.name))
      : filtered;
  const toggleCompare = (id: string) => setCompareIds((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try { return createComparison(next); } catch { return current; }
  });
  const filtersPanel = <ProductFilters drives={drives} applications={applications} value={filters} onChange={setFilters} />;

  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead input={{ path, pageType: 'website', name: `${subcategory.name} | ${category.name}`, description: `Browse ${subcategory.name} products in the ${category.name} range, including available images and technical parameters.`, image: subcategory.image || category.bannerImage, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: category.name, path: `/products/${category.id}` }, { name: subcategory.name, path }] }} />
      <Header />
      <main id="main" className="industrial-page flex-grow pt-16 lg:pt-[72px]">
        <PageHero
          eyebrow={`${category.name} / Vehicle type`}
          title={subcategory.name}
          description={`Explore available ${subcategory.name.toLowerCase()} models, imagery and published technical parameters.`}
          image={subcategory.image || category.bannerImage}
        />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href={`/products/${category.id}`} className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All {category.name}
          </Link>
          <div className="mt-4 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
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
                  <p className="font-semibold text-[var(--industrial-text)]">No vehicles match these filters.</p>
                  <button type="button" onClick={() => setFilters({ drive: [], applications: [] })} className="mt-4 min-h-11 text-sm font-bold uppercase text-[var(--industrial-accent)]">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-bold uppercase text-[var(--industrial-text)]">Confirm the final configuration.</h2>
              <p className="mt-2 text-[var(--industrial-muted)]">Send destination, payload and operating conditions with the models you are considering.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Prepare an RFQ <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
        <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title={`Filter ${subcategory.name}`}>
          {filtersPanel}
        </FilterDrawer>
        <CompareTray count={compareIds.length} onClear={() => setCompareIds([])} onCompare={() => setShowComparison(true)} />
        {showComparison && (
          <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Vehicle comparison">
            <div className="mx-auto mt-10 max-w-6xl border border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold uppercase text-[var(--industrial-text)]">Compare specifications</h2>
                <button type="button" onClick={() => setShowComparison(false)} className="min-h-11 text-sm font-bold uppercase text-[var(--industrial-text)]">Close</button>
              </div>
              <ComparisonTable products={products.filter((product) => compareIds.includes(product.id))} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: productCategories.flatMap((category) => category.subcategories.map((subcategory) => ({ params: { category: category.id, subcategory: subcategory.id } }))),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { category: string; subcategory: string } }) {
  const category = productCategories.find((item) => item.id === params.category);
  const subcategory = category?.subcategories.find((item) => item.id === params.subcategory);
  if (!category || !subcategory) return { notFound: true };
  return {
    props: {
      category: { id: category.id, name: category.name, bannerImage: category.bannerImage },
      subcategory,
      products: getProductsBySubcategory(category.id, subcategory.id).map(toCatalogueProduct),
    },
  };
}
