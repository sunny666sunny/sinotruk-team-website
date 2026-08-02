import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { resolveRelatedLinks } from '@/lib/seo/internal-links';

type RelatedContentProps = {
  currentPath: string;
  category: string;
};

export function RelatedContent({ currentPath, category }: RelatedContentProps) {
  const relatedLinks = resolveRelatedLinks({ currentPath, candidates: [
    { href: `/products/${category}`, label: 'Related vehicles' },
    { href: '/parts', label: 'Parts catalogue' },
    { href: '/news', label: 'Procurement articles' },
  ] });

  return (
    <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold uppercase text-[var(--industrial-text)]">Continue your product review</h2>
        <div className="mt-7 grid gap-px bg-[var(--industrial-line)] md:grid-cols-3">
          {relatedLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group flex min-h-48 flex-col bg-[var(--industrial-panel)] p-6">
              <h3 className="text-2xl font-bold uppercase text-[var(--industrial-text)]">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">
                {item.href === '/parts' ? 'Search published parts records and compatibility information.' : item.href === '/news' ? 'Read available product and purchasing guidance.' : 'Review other published vehicles in this category.'}
              </p>
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
