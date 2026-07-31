'use client';

import Link from 'next/link';
import { Check, ClipboardPlus, GitCompareArrows, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { addToShortlist, readShortlist, saveShortlist } from '@/lib/procurement/shortlist';

export type StickyRfqActionsProps = {
  productId: string;
  contactHref: string;
};

export function StickyRfqActions({ productId, contactHref }: StickyRfqActionsProps) {
  const [shortlisted, setShortlisted] = useState(false);

  useEffect(() => setShortlisted(readShortlist().includes(productId)), [productId]);

  const add = () => {
    saveShortlist(addToShortlist(readShortlist(), productId));
    setShortlisted(true);
  };

  return (
    <div className="-mx-4 mt-7 grid grid-cols-3 border-y border-[var(--industrial-line)] bg-[var(--industrial-bg)] p-2 sm:mx-0 lg:sticky lg:top-24 lg:z-20 lg:mt-0 lg:grid-cols-1 lg:self-start lg:border lg:p-3">
      <button
        type="button"
        onClick={add}
        disabled={shortlisted}
        className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.05em] text-[var(--industrial-text)] disabled:text-[var(--industrial-muted)] lg:px-4"
      >
        {shortlisted ? <Check className="h-4 w-4" aria-hidden="true" /> : <ClipboardPlus className="h-4 w-4" aria-hidden="true" />}
        <span>{shortlisted ? 'Shortlisted' : 'Add to shortlist'}</span>
      </button>
      <Link
        href="/products"
        className="inline-flex min-h-12 items-center justify-center gap-2 border-x border-[var(--industrial-line)] px-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.05em] text-[var(--industrial-text)] lg:border-x-0 lg:border-y lg:px-4"
      >
        <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
        Compare
      </Link>
      <Link
        href={contactHref}
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--industrial-accent)] px-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.05em] text-[#061314] lg:px-4"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Prepare RFQ
      </Link>
    </div>
  );
}
