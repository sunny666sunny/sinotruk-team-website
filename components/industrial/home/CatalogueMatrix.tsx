import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { productCategories } from '@/data/siteConfig'

export type CatalogueMatrixProps = { categories: typeof productCategories }

export function CatalogueMatrix({ categories }: CatalogueMatrixProps) {
  return (
    <section className="industrial-home-section industrial-home-catalogue" aria-labelledby="catalogue-title">
      <div className="industrial-home-section-heading">
        <div>
          <p className="industrial-home-kicker">Vehicle catalogue</p>
          <h2 id="catalogue-title">Start with the platform. Configure for the job.</h2>
        </div>
        <Link href="/products" className="industrial-home-text-link">
          View full catalogue <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="industrial-home-catalogue-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.id}`}
            className={[
              'industrial-home-category',
              category.id === 'heavy-truck' ? 'industrial-home-category-primary' : '',
              category.id === 'light-truck' ? 'industrial-home-category-wide' : '',
            ].filter(Boolean).join(' ')}
          >
            <Image
              src={category.image}
              alt={`${category.name} vehicle range`}
              fill
              sizes={category.id === 'heavy-truck' ? '(min-width: 1024px) 40vw, (min-width: 768px) 100vw, 100vw' : '(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw'}
              className="industrial-home-cover"
            />
            <span className="industrial-home-image-shade" aria-hidden="true" />
            <span className="industrial-home-category-copy">
              <strong>{category.name}</strong>
              <small>{category.description}</small>
            </span>
            <ArrowUpRight className="industrial-home-card-arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  )
}
