import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addToShortlist, readShortlist, saveShortlist } from '@/lib/procurement/shortlist';
import { SiteImage } from '@/components/SiteImage';

interface ProductCardProps { product: { id: string; name: string; category: string; subcategory: string; description: string; image: string }; compareSelected?: boolean; onCompareChange?: (id: string) => void; }

export default function ProductCard({ product, compareSelected = false, onCompareChange }: ProductCardProps) {
  const [shortlisted, setShortlisted] = useState(false);
  useEffect(() => setShortlisted(readShortlist().includes(product.id)), [product.id]);
  const add = () => { saveShortlist(addToShortlist(readShortlist(), product.id)); setShortlisted(true); };
  return <article className="overflow-hidden border border-[var(--color-line)] bg-white transition-shadow hover:shadow-md"><Link href={`/products/${product.category}/${product.subcategory}/${product.id}`} className="group block"><div className="relative flex h-48 items-center justify-center overflow-hidden bg-[var(--color-canvas)]">{product.image ? <SiteImage src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : <span className="text-sm text-[var(--color-steel)]">Image unavailable</span>}</div><div className="p-5"><p className="text-xs font-bold uppercase tracking-[.1em] text-[var(--color-steel)]">{product.category.replaceAll('-', ' ')}</p><h3 className="mt-2 text-lg font-bold text-[var(--color-ink)]">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-steel)]">{product.description}</p><span className="mt-4 inline-block text-sm font-bold text-[var(--color-signal)]">View specs →</span></div></Link><div className="flex gap-2 border-t border-[var(--color-line)] p-3"><button type="button" onClick={add} disabled={shortlisted} className="flex-1 border border-[var(--color-line)] px-3 py-2 text-xs font-bold text-[var(--color-ink)] disabled:text-[var(--color-steel)]">{shortlisted ? 'On shortlist' : 'Add to shortlist'}</button>{onCompareChange && <button type="button" onClick={() => onCompareChange(product.id)} className={`flex-1 border px-3 py-2 text-xs font-bold ${compareSelected ? 'border-[var(--color-signal)] text-[var(--color-signal)]' : 'border-[var(--color-line)] text-[var(--color-ink)]'}`}>{compareSelected ? 'Selected' : 'Compare'}</button>}</div></article>;
}
