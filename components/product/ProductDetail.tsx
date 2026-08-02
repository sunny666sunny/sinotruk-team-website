'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { SiteImage } from '@/components/SiteImage';
import { GroupedSpecifications } from '@/components/industrial/catalogue/GroupedSpecifications';
import { KeySpecCluster } from '@/components/industrial/catalogue/KeySpecCluster';
import { ProductMediaPanel } from '@/components/industrial/catalogue/ProductMediaPanel';
import { RelatedContent } from '@/components/industrial/catalogue/RelatedContent';
import { StickyRfqActions } from '@/components/industrial/catalogue/StickyRfqActions';
import { groupSpecifications } from '@/lib/procurement/group-specifications';

export default function ProductDetail({ product }: { product: Product }) {
  const groups = groupSpecifications(product.specifications);
  const galleryImages = [...new Set(
    [product.image, product.bannerImage, ...(product.galleryImages ?? [])].filter((image): image is string => Boolean(image)),
  )];
  const hasUnreviewedDetails = Boolean(product.detailedFeatures && Object.keys(product.detailedFeatures).length);

  return (
    <div className="industrial-page bg-[var(--industrial-bg)]">
      <section className="border-b border-[var(--industrial-line)] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden py-5 text-xs text-[var(--industrial-muted)]" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <Link href="/products">Products</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <Link href={`/products/${product.category}`} className="capitalize">{product.category.replaceAll('-', ' ')}</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate text-[var(--industrial-text)]">{product.name}</span>
        </nav>
      </section>

      <section className="relative isolate min-h-[34rem] overflow-hidden border-b border-[var(--industrial-line)]">
        <SiteImage
          src={product.bannerImage || product.image}
          decorative
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(3_11_13/.96),rgb(3_11_13/.62)_58%,rgb(3_11_13/.18)),linear-gradient(0deg,rgb(3_11_13/.82),transparent_55%)]" />
        <div className="mx-auto flex min-h-[34rem] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--industrial-accent)]">{product.subcategory.replaceAll('-', ' ')}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-bold uppercase leading-[.9] tracking-[-.04em] text-[var(--industrial-text)] sm:text-7xl lg:text-8xl">{product.name}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--industrial-muted)] sm:text-lg">{product.description}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8 lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Product Details</p>
          <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Published configuration</h2>
          <p className="mt-5 max-w-3xl leading-7 text-[var(--industrial-muted)]">
            Use the published values as the starting point for configuration review. Prepare an RFQ to confirm operating
            conditions, destination requirements and unlisted specifications.
          </p>
          <div className="mt-8">
            <KeySpecCluster groups={groups} maxItems={5} />
          </div>
        </div>
        <StickyRfqActions productId={product.id} contactHref={`/contact?product=${encodeURIComponent(product.id)}`} />
      </section>

      <section className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Available specifications</p>
            <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Configuration by system</h2>
            <p className="mt-5 leading-7 text-[var(--industrial-muted)]">
              Values below are preserved exactly as published. Missing fields are marked for confirmation.
              {hasUnreviewedDetails && ' Additional source fields exist and require data review before publication; they are not merged here.'}
            </p>
          </div>
          <div className="mt-8">
            <GroupedSpecifications groups={groups} />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Product gallery</p>
          <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Vehicle views</h2>
          <div className="mt-8">
            <ProductMediaPanel images={galleryImages} name={product.name} />
          </div>
        </div>
      </section>

      <RelatedContent currentPath={`/products/${product.category}/${product.subcategory}/${product.id}`} category={product.category} performanceItems={product.performanceItems} />
    </div>
  );
}
