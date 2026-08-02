import { SiteImage } from '@/components/SiteImage'
import type { ProductDetailContent } from '@/lib/product-detail/types'

export function PerformanceSection({ content }: { content: ProductDetailContent }) {
  return <section className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--industrial-accent)]">Capability review</p><h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">Performance</h2><p className="mt-5 leading-7 text-[var(--industrial-muted)]">{content.performanceSummary}</p></div>
      <div className="mt-8 grid gap-px bg-[var(--industrial-line)] md:grid-cols-3">
        {content.performanceItems.map((item, index) => <article key={`${item.title}-${index}`} className="bg-[var(--industrial-panel)]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#081113]"><SiteImage src={item.image} alt={`${item.title} for this published product configuration`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
          <div className="p-5"><p className="font-mono text-xs text-[var(--industrial-accent)]">0{index + 1}</p><h3 className="mt-3 text-2xl font-bold uppercase text-[var(--industrial-text)]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">{item.description}</p></div>
        </article>)}
      </div>
    </div>
  </section>
}
