'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, ClipboardPlus, FileText } from 'lucide-react'
import type { Product } from '@/data/products'
import SpecificationTable from '@/components/product/SpecificationTable'
import { addToShortlist, readShortlist, saveShortlist } from '@/lib/procurement/shortlist'

export default function ProductDetail({ product }: { product: Product }) {
  const addToProcurementShortlist = () => saveShortlist(addToShortlist(readShortlist(), product.id))

  return (
    <div className="bg-[var(--color-panel)]">
      <section className="border-b border-[var(--color-line)] bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-steel)]" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/products">Products</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href={`/products/${product.category}`}>{product.category.replaceAll('-', ' ')}</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="relative isolate min-h-[360px] overflow-hidden bg-[var(--color-ink)] text-white sm:min-h-[440px]">
        <img src={product.bannerImage || product.image} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,39,.88),rgba(16,35,39,.43),rgba(16,35,39,.12))]" />
        <div className="mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 py-12 sm:min-h-[440px] sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[.14em] text-teal-100">{product.subcategory.replaceAll('-', ' ')}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-[-.04em] sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">{product.description}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,.9fr)] lg:px-8 lg:py-14">
        <div className="flex min-h-[24rem] items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-8">
          <img
            src={product.bannerImage || product.image}
            alt={product.name}
            className="max-h-[32rem] max-w-full object-contain"
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[.12em] text-[var(--color-signal-dark)]">
            {product.subcategory.replaceAll('-', ' ')}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] text-[var(--color-ink)]">Product Details</h2>
          <p className="mt-5 leading-7 text-[var(--color-steel)]">Use the images, available product information and parameters below as the starting point for configuration review.</p>

          <div className="mt-7 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-5">
            <h2 className="font-semibold text-[var(--color-ink)]">Configuration confirmation</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-steel)]">
              Use the listed data as a starting point. Confirm operating conditions, destination requirements and any
              unlisted specification through your RFQ.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addToProcurementShortlist}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--color-line)] px-5 text-sm font-semibold text-[var(--color-ink)]"
            >
              <ClipboardPlus className="h-4 w-4" />
              Add to shortlist
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--color-signal)] px-5 text-sm font-semibold text-[var(--color-ink)]"
            >
              Prepare an RFQ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-[-.025em] text-[var(--color-ink)]">Available specifications</h2>
          <div className="mt-6 max-w-4xl">
            <SpecificationTable specifications={product.specifications} />
          </div>

          {product.detailedFeatures && Object.keys(product.detailedFeatures).length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold tracking-[-.025em] text-[var(--color-ink)]">Configuration details</h2>
              <div className="mt-6 max-w-4xl">
                <SpecificationTable specifications={product.detailedFeatures} />
              </div>
            </div>
          )}
        </div>
      </section>

      {product.performanceItems?.length ? (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-ink)]">Available product information</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.performanceItems.map((item, index) => (
              <article key={index} className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-steel)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {product.galleryImages?.length ? (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-canvas)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--color-ink)]">Product gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {product.galleryImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${product.name}, view ${index + 1}`}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--color-ink)] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-panel)]">Need help comparing configurations?</h2>
            <p className="mt-2 text-[var(--color-canvas)]">
              Add products to the shortlist or send your operating requirements for review.
            </p>
          </div>
          <Link
            href="/shortlist"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--color-signal)] px-5 font-semibold text-[var(--color-ink)]"
          >
            View shortlist
            <FileText className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
