import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import { productCategories } from '@/data/siteConfig'

type CatalogueCategory = Pick<(typeof productCategories)[number], 'id' | 'name' | 'description' | 'image'>

export default function CategorySection({ categories = productCategories }: { categories?: CatalogueCategory[] }) {
  return <section className="bg-[var(--color-canvas)] py-16 lg:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold uppercase tracking-[.12em] text-[var(--color-signal-dark)]">Vehicle catalogue</p><h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-.035em] text-[var(--color-ink)]">Start with the vehicle family that fits the work.</h2></div>
        <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">View full catalogue <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => <Link key={category.id} href={`/products/${category.id}`} className="group overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] transition hover:-translate-y-0.5 hover:border-[var(--color-signal-dark)] hover:shadow-[0_16px_34px_rgb(23_40_44_/_0.12)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-ink)]"><SiteImage src={category.image} alt={`${category.name} commercial vehicles`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgb(23_40_44_/_0.55)] to-transparent" /></div>
          <div className="p-5"><h3 className="text-xl font-bold tracking-[-.02em] text-[var(--color-ink)]">{category.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-steel)]">{category.description}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">Browse models <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
        </Link>)}
      </div>
    </div>
  </section>
}
