import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteImage } from '@/components/SiteImage';
import type { PerformanceItem } from '@/data/products';

type RelatedContentProps = {
  category: string;
  performanceItems?: PerformanceItem[];
};

export function RelatedContent({ category, performanceItems = [] }: RelatedContentProps) {
  return (
    <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {performanceItems.length > 0 && (
          <>
            <h2 className="text-4xl font-bold uppercase text-[var(--industrial-text)]">Available product information</h2>
            <div className="mt-7 grid gap-px bg-[var(--industrial-line)] md:grid-cols-3">
              {performanceItems.map((item, index) => (
                <article key={`${item.title}-${index}`} className="bg-[var(--industrial-panel)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#081113]">
                    <SiteImage src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-[var(--industrial-text)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className={`${performanceItems.length ? 'mt-14' : ''} grid gap-px bg-[var(--industrial-line)] md:grid-cols-3`}>
          {[
            { href: `/products/${category}`, label: 'Related vehicles', copy: 'Review other published vehicles in this category.' },
            { href: '/parts', label: 'Parts catalogue', copy: 'Search published parts records and compatibility information.' },
            { href: '/news', label: 'Procurement articles', copy: 'Read available product and purchasing guidance.' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group flex min-h-48 flex-col bg-[var(--industrial-panel)] p-6">
              <h3 className="text-2xl font-bold uppercase text-[var(--industrial-text)]">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">{item.copy}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
