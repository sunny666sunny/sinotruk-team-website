import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'
import type { ProductApplicationArea } from '@/lib/product-detail/types'

export function ApplicationAreasSection({ areas }: { areas: ProductApplicationArea[] }) {
  return <section className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--industrial-accent)]">Where it fits</p><h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">SINOTRUK Application Areas</h2><p className="mt-5 leading-7 text-[var(--industrial-muted)]">Review operating scenarios selected from the published vehicle type. Final suitability depends on route, load, body and destination requirements.</p></div>
      <div className="mt-8 grid gap-px bg-[var(--industrial-line)] md:grid-cols-2 lg:grid-cols-3">{areas.map((area) => <article key={area.title} className="group flex flex-col bg-[var(--industrial-panel)]"><div className="relative aspect-[16/10] overflow-hidden bg-[#081113]"><SiteImage src={area.image} alt={`${area.title} operating scenario`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="flex flex-1 flex-col p-6"><h3 className="text-2xl font-bold uppercase text-[var(--industrial-text)]">{area.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">{area.description}</p><ul className="mt-5 space-y-2 text-sm text-[var(--industrial-muted)]">{area.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="text-[var(--industrial-accent)]">—</span>{bullet}</li>)}</ul><Link href={area.href} className="mt-auto inline-flex min-h-11 items-end gap-2 pt-6 text-xs font-bold uppercase tracking-[.08em] text-[var(--industrial-accent)]">Explore related vehicles <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></article>)}</div>
    </div>
  </section>
}
