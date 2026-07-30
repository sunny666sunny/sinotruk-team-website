import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { SeoHead } from '@/components/seo/SeoHead';
import { productCategories } from '@/data/siteConfig';
import { getProductsByCategory, type Product } from '@/data/products';

type Props = { category: { id: string; name: string; categoryDescription?: string; description: string; bannerImage: string; subcategories: { id: string; name: string }[] }; products: Product[] };

export default function ProductCategoryPage({ category, products }: Props) {
  const router = useRouter();
  const tab = typeof router.query.tab === 'string' ? router.query.tab : 'all';
  const visible = tab === 'all' ? products : products.filter((product) => product.subcategory === tab);
  const path = `/products/${category.id}`;

  useEffect(() => {
    if (tab !== 'all' && !category.subcategories.some((subcategory) => subcategory.id === tab)) void router.replace(path);
  }, [tab, category, path, router]);

  return <div className="flex min-h-screen flex-col"><SeoHead input={{ path, pageType: 'website', name: category.name, description: category.categoryDescription || category.description, image: category.bannerImage, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: category.name, path }] }} /><Header />
    <main id="main" className="flex-grow bg-[var(--color-panel)] pt-16 lg:pt-[72px]">
      <section className="relative isolate min-h-[360px] overflow-hidden bg-[var(--color-ink)] text-white sm:min-h-[420px]">
        <img src={category.bannerImage} alt={`${category.name} commercial trucks`} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,39,.86),rgba(16,35,39,.40),rgba(16,35,39,.12))]" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 py-12 sm:min-h-[420px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-100"><Link href="/">Home</Link><ChevronRight className="h-4 w-4" /><Link href="/products">Products</Link><ChevronRight className="h-4 w-4" /><span>{category.name}</span></div>
          <h1 className="mt-7 max-w-3xl text-4xl font-extrabold tracking-[-.04em] sm:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">{category.categoryDescription || category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2" aria-label="Product subcategory filters"><Link href={path} className={`min-h-11 border px-4 py-2 text-sm font-semibold ${tab === 'all' ? 'border-[var(--color-signal-dark)] bg-[var(--color-signal-dark)] text-white' : 'border-[var(--color-line)] text-[var(--color-ink)]'}`}>All ({products.length})</Link>{category.subcategories.map((subcategory) => { const count = products.filter((product) => product.subcategory === subcategory.id).length; return <Link key={subcategory.id} href={`${path}?tab=${subcategory.id}`} className={`min-h-11 border px-4 py-2 text-sm font-semibold ${tab === subcategory.id ? 'border-[var(--color-signal-dark)] bg-[var(--color-signal-dark)] text-white' : 'border-[var(--color-line)] text-[var(--color-ink)]'}`}>{subcategory.name} ({count})</Link>; })}</div>
        <div className="mt-8 flex items-center justify-between border-b border-[var(--color-line)] pb-4"><p className="text-sm text-[var(--color-steel)]">{visible.length} vehicles available in this view.</p><Link href="/shortlist" className="text-sm font-semibold text-[var(--color-signal-dark)]">View shortlist</Link></div>
        {visible.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-6 border border-dashed border-[var(--color-line)] p-10 text-center"><p className="font-semibold text-[var(--color-ink)]">No vehicles are listed in this subcategory yet.</p><Link href={path} className="mt-4 inline-block text-sm font-semibold text-[var(--color-signal-dark)]">Show all {category.name}</Link></div>}
      </section>
      <section className="bg-[var(--color-ink)] py-12"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="text-2xl font-bold text-[var(--color-panel)]">Need a configuration recommendation?</h2><p className="mt-2 text-[var(--color-canvas)]">Add relevant vehicles to your shortlist, then send operating conditions and destination details.</p></div><Link href="/contact" className="inline-flex min-h-11 items-center gap-2 bg-[var(--color-signal)] px-5 font-semibold text-[var(--color-ink)]">Prepare an RFQ <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main><Footer /></div>;
}

export async function getStaticPaths() { return { paths: productCategories.map((category) => ({ params: { category: category.id } })), fallback: false }; }
export async function getStaticProps({ params }: { params: { category: string } }) { const category = productCategories.find((item) => item.id === params.category); if (!category) return { notFound: true }; return { props: { category: { id: category.id, name: category.name, categoryDescription: category.categoryDescription || null, description: category.description, bannerImage: category.bannerImage, subcategories: category.subcategories.map((subcategory) => ({ id: subcategory.id, name: subcategory.name })) }, products: getProductsByCategory(category.id) } }; }
