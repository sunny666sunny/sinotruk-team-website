import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import ProductFilters from '@/components/procurement/ProductFilters';
import CompareTray from '@/components/procurement/CompareTray';
import { CatalogueToolbar } from '@/components/industrial/catalogue/CatalogueToolbar';
import { CompareDialog } from '@/components/industrial/catalogue/CompareDialog';
import { IndustrialProductCard, toCatalogueProduct } from '@/components/industrial/catalogue/IndustrialProductCard';
import { FilterDrawer } from '@/components/ui/FilterDrawer';
import { SeoHead } from '@/components/seo/SeoHead';
import { productCategories } from '@/data/siteConfig';
import { getProductsByCategory } from '@/data/products';
import { createComparison } from '@/lib/procurement/compare-products';
import { filterProducts } from '@/lib/procurement/filter-products';
import type { ProductFilterState } from '@/lib/procurement/types';
import type { ProcurementProduct } from '@/lib/content/serializers';

type Props = {
  category: {
    id: string;
    name: string;
    categoryDescription?: string;
    description: string;
    bannerImage: string;
    subcategories: { id: string; name: string }[];
  };
  products: ProcurementProduct[];
};

export default function ProductCategoryPage({ category, products }: Props) {
  const path = `/products/${category.id}`;
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
      <SeoHead input={{ path, pageType: 'collection', name: category.name, description: category.categoryDescription || category.description, image: category.bannerImage, items: products.map((product) => ({ name: product.name, url: `/products/${product.category}/${product.subcategory}/${product.id}` })), breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: category.name, path }] }} />
      <Header />
      <main id="main" className="industrial-page flex-grow pt-16 lg:pt-[72px]">
        <PageHero
          eyebrow="Products / Vehicle range"
          title={category.name}
          description={category.categoryDescription || category.description}
          image={category.bannerImage}
        />
        <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-surface)] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Vehicle types</p>
            <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)]">Browse by vehicle type</h2>
            <div className="mt-7 grid gap-px overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-line)] md:grid-cols-2 lg:grid-cols-3">
              {category.subcategories.map((subcategory) => {
                const items = products.filter((product) => product.subcategory === subcategory.id);
                return (
                  <Link key={subcategory.id} href={`/products/${category.id}/${subcategory.id}`} className="group bg-[var(--industrial-panel)] p-6 transition hover:bg-[#17292d]">
                    <p className="text-xs font-bold uppercase tracking-[.1em] text-[var(--industrial-accent)]">{items.length} models</p>
                    <h3 className="mt-3 text-2xl font-bold uppercase text-[var(--industrial-text)]">{subcategory.name}</h3>
                    <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-muted)]">
                      View models <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <div className="hidden lg:block">{filtersPanel}</div>
            <div>
              <CatalogueToolbar count={visible.length} onOpenFilters={() => setFiltersOpen(true)} sort={sort} onSort={setSort} />
              {visible.length ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
              <h2 className="text-3xl font-bold uppercase text-[var(--industrial-text)]">Need a configuration recommendation?</h2>
              <p className="mt-2 text-[var(--industrial-muted)]">Add relevant vehicles to your shortlist, then send operating conditions and destination details.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Prepare an RFQ <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
        <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title={`Filter ${category.name}`}>
          {filtersPanel}
        </FilterDrawer>
        <CompareTray count={compareIds.length} onClear={() => setCompareIds([])} onCompare={() => setShowComparison(true)} />
        <CompareDialog open={showComparison} onClose={() => setShowComparison(false)} products={products.filter((product) => compareIds.includes(product.id))} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return { paths: productCategories.map((category) => ({ params: { category: category.id } })), fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  const category = productCategories.find((item) => item.id === params.category);
  if (!category) return { notFound: true };
  return {
    props: {
      category: {
        id: category.id,
        name: category.name,
        categoryDescription: category.categoryDescription || null,
        description: category.description,
        bannerImage: category.bannerImage,
        subcategories: category.subcategories.map((subcategory) => ({ id: subcategory.id, name: subcategory.name })),
      },
      products: getProductsByCategory(category.id).map(toCatalogueProduct),
    },
  };
}
