import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { SeoHead } from '@/components/seo/SeoHead';
import { productCategories } from '@/data/siteConfig';
import { getProductsByCategory, type Product } from '@/data/products';

type Props = { category: { id: string; name: string; categoryDescription?: string; description: string; bannerImage: string; subcategories: { id: string; name: string }[] }; products: Product[] };

export default function ProductCategoryPage({ category, products }: Props) {
  const path = `/products/${category.id}`;

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
      <section className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-extrabold tracking-[-.035em] text-[var(--color-ink)]">Browse by vehicle type</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{category.subcategories.map((subcategory) => { const items = products.filter((product) => product.subcategory === subcategory.id); return <Link key={subcategory.id} href={`/products/${category.id}/${subcategory.id}`} className="group border border-[var(--color-line)] bg-[var(--color-panel)] p-5 transition hover:border-[var(--color-signal-dark)]"><p className="text-sm font-semibold uppercase tracking-[.1em] text-[var(--color-signal-dark)]">{items.length} models</p><h3 className="mt-2 text-xl font-bold text-[var(--color-ink)]">{subcategory.name}</h3><span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View models <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link> })}</div></div></section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4"><div><h2 className="text-2xl font-bold tracking-[-.025em] text-[var(--color-ink)]">All {category.name} models</h2><p className="mt-1 text-sm text-[var(--color-steel)]">{products.length} vehicles available in this range.</p></div><Link href="/shortlist" className="text-sm font-semibold text-[var(--color-signal-dark)]">View shortlist</Link></div>
        {products.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-6 border border-dashed border-[var(--color-line)] p-10 text-center"><p className="font-semibold text-[var(--color-ink)]">No vehicles are listed in this category yet.</p></div>}
      </section>
      <section className="bg-[var(--color-ink)] py-12"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="text-2xl font-bold text-[var(--color-panel)]">Need a configuration recommendation?</h2><p className="mt-2 text-[var(--color-canvas)]">Add relevant vehicles to your shortlist, then send operating conditions and destination details.</p></div><Link href="/contact" className="inline-flex min-h-11 items-center gap-2 bg-[var(--color-signal)] px-5 font-semibold text-[var(--color-ink)]">Prepare an RFQ <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main><Footer /></div>;
}

export async function getStaticPaths() { return { paths: productCategories.map((category) => ({ params: { category: category.id } })), fallback: false }; }
export async function getStaticProps({ params }: { params: { category: string } }) { const category = productCategories.find((item) => item.id === params.category); if (!category) return { notFound: true }; return { props: { category: { id: category.id, name: category.name, categoryDescription: category.categoryDescription || null, description: category.description, bannerImage: category.bannerImage, subcategories: category.subcategories.map((subcategory) => ({ id: subcategory.id, name: subcategory.name })) }, products: getProductsByCategory(category.id) } }; }
