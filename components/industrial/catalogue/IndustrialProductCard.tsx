import Link from 'next/link';
import { ArrowRight, Check, GitCompareArrows, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteImage } from '@/components/SiteImage';
import { addToShortlist, readShortlist, saveShortlist } from '@/lib/procurement/shortlist';
import type { ProcurementProduct } from '@/lib/content/serializers';
import type { Product } from '@/data/products';

export type IndustrialProductCardProps = {
  product: ProcurementProduct;
  compareSelected?: boolean;
  onCompareChange?(id: string): void;
};

export function toCatalogueProduct(product: Product): ProcurementProduct {
  const drive = Object.entries(product.specifications).find(([label]) => /^(?:drive type|driving form)$/i.test(label))?.[1];
  const power = Object.entries(product.specifications).find(([label]) => /\bpower\b/i.test(label))?.[1];
  return {
    ...product,
    normalizedSpecs: { ...product.specifications, ...(drive ? { drive } : {}), ...(power ? { power } : {}) },
    applicationTags: [],
    marketTags: [],
  };
}

export function IndustrialProductCard({ product, compareSelected = false, onCompareChange }: IndustrialProductCardProps) {
  const [shortlisted, setShortlisted] = useState(false);
  const href = `/products/${product.category}/${product.subcategory}/${product.id}`;
  const specifications = Object.entries(
    Object.keys(product.normalizedSpecs).length ? product.normalizedSpecs : product.specifications,
  ).filter(([, value]) => value).slice(0, 3);

  useEffect(() => setShortlisted(readShortlist().includes(product.id)), [product.id]);

  const add = () => {
    saveShortlist(addToShortlist(readShortlist(), product.id));
    setShortlisted(true);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-panel)] transition hover:-translate-y-1 hover:border-[var(--industrial-accent)]">
      <Link href={href} className="block">
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#091416]">
          {product.image ? (
            <SiteImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="text-sm text-[var(--industrial-muted)]">Image unavailable</span>
          )}
          <span className="absolute left-4 top-4 bg-[#081113]/85 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--industrial-accent)]">
            {product.subcategory.replaceAll('-', ' ')}
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-bold uppercase leading-none text-[var(--industrial-text)]">{product.name}</h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--industrial-muted)]">{product.description || 'Description unavailable.'}</p>
          {specifications.length ? (
            <dl className="mt-5 grid gap-2 border-t border-[var(--industrial-line)] pt-4">
              {specifications.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 text-xs">
                  <dt className="text-[var(--industrial-muted)]">{label}</dt>
                  <dd className="text-right font-semibold text-[var(--industrial-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 border-t border-[var(--industrial-line)] pt-4 text-xs text-[var(--industrial-muted)]">
              Specifications available on request.
            </p>
          )}
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">
            View specifications <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="mt-auto grid grid-cols-2 border-t border-[var(--industrial-line)]">
        <button
          type="button"
          onClick={add}
          disabled={shortlisted}
          aria-label={shortlisted ? `${product.name} is on shortlist` : `Add ${product.name} to shortlist`}
          className="inline-flex min-h-12 items-center justify-center gap-2 border-r border-[var(--industrial-line)] px-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--industrial-text)] disabled:text-[var(--industrial-muted)]"
        >
          {shortlisted ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          {shortlisted ? 'On shortlist' : 'Add to shortlist'}
        </button>
        {onCompareChange ? (
          <button
            type="button"
            onClick={() => onCompareChange(product.id)}
            aria-pressed={compareSelected}
            aria-label={compareSelected ? `Remove ${product.name} from comparison` : `Compare ${product.name}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 px-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--industrial-text)]"
          >
            <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
            {compareSelected ? 'Selected' : 'Compare'}
          </button>
        ) : (
          <Link href="/contact" aria-label={`Prepare RFQ for ${product.name}`} className="inline-flex min-h-12 items-center justify-center px-3 text-xs font-bold uppercase tracking-[0.06em] text-[var(--industrial-text)]">
            Prepare RFQ
          </Link>
        )}
      </div>
      {onCompareChange && (
        <Link href="/contact" aria-label={`Prepare RFQ for ${product.name}`} className="flex min-h-11 items-center justify-center border-t border-[var(--industrial-line)] text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">
          Prepare RFQ
        </Link>
      )}
    </article>
  );
}
