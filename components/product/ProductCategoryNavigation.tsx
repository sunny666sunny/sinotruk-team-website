import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import { productCategories } from '@/data/siteConfig'

export default function ProductCategoryNavigation() {
  return <section className="border-b border-[var(--color-line)] bg-[var(--color-panel)] py-10 lg:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-[-.035em] text-[var(--color-ink)]">Browse by vehicle type</h2>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--color-steel)]">Choose a vehicle family first, then select the truck type and model that fits the operating application.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{productCategories.map((category) => <Link key={category.id} href={`/products/${category.id}`} className="group overflow-hidden border border-[var(--color-line)] bg-[var(--color-canvas)] transition hover:border-[var(--color-signal-dark)] hover:shadow-[0_12px_26px_rgb(23_40_44_/_0.10)]"><div className="relative aspect-[16/9] overflow-hidden"><SiteImage src={category.image} alt={category.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div><div className="p-5"><h3 className="text-xl font-bold text-[var(--color-ink)]">{category.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-steel)]">{category.description}</p><span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View range <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div>
    </div>
  </section>
}
