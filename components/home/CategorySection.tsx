import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '@/data/siteConfig';

type CatalogueCategory = Pick<(typeof productCategories)[number], 'id' | 'name' | 'description'>;

export default function CategorySection({ categories = productCategories }: { categories?: CatalogueCategory[] }) {
  return <section className="bg-[var(--color-canvas)] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--color-signal)]">Vehicle catalogue</p><h2 className="mt-2 text-3xl font-extrabold text-[var(--color-ink)]">Find a starting point by vehicle family.</h2></div><Link href="/products" className="text-sm font-bold text-[var(--color-signal)]">View full catalogue <ArrowRight className="inline h-4 w-4" /></Link></div><div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category.id} href={`/products/${category.id}`} className="group border border-[var(--color-line)] bg-white p-5 transition-colors hover:border-[var(--color-signal)]"><h3 className="font-bold text-[var(--color-ink)]">{category.name}</h3><p className="mt-2 text-sm leading-6 text-[var(--color-steel)]">{category.description}</p><span className="mt-4 inline-block text-sm font-bold text-[var(--color-signal)]">Browse models →</span></Link>)}</div></div></section>;
}
