import Link from 'next/link'
import { productCategories } from '@/data/siteConfig'

export default function Navigation() {
  return (
    <nav className="border-b border-[var(--color-line)] bg-[var(--color-canvas)]" aria-label="Product categories">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-1 py-2">
          <span className="mr-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-steel)]">Catalogue</span>
          {productCategories.map((category) => (
            <Link key={category.id} href={`/products/${category.id}`} className="rounded px-3 py-2 text-sm font-semibold text-[var(--color-steel)] transition-colors hover:bg-white hover:text-[var(--color-signal)]">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
