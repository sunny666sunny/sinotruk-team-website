import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroBanner() {
  return <section className="relative isolate min-h-[44rem] overflow-hidden bg-[var(--color-ink)] py-28 text-white md:py-36">
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(7,17,31,.94)_0%,rgba(7,17,31,.64)_48%,rgba(7,17,31,.2)_100%),url('/images/products/Heavy-Truck.webp')] bg-cover bg-center" />
    <div className="hero-light-track absolute -right-1/4 top-1/4 -z-10 h-px w-[90%] rotate-[-18deg] bg-[var(--color-signal)] opacity-70" />
    <div className="hero-light-track hero-light-track--late absolute -right-1/4 top-1/2 -z-10 h-px w-[75%] rotate-[-18deg] bg-white opacity-50" />
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
      <div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--color-signal)]">Commercial truck export procurement</p><h1 className="mt-4 text-5xl font-extrabold leading-[.92] tracking-[-.055em] sm:text-6xl lg:text-7xl">MOVE THE HEAVY WORK.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">SINOTRUK TEAM helps overseas buyers navigate vehicle selection, configuration questions, spare parts and RFQ coordination without publishing unverified prices or promises.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--color-signal)] px-5 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-white">Explore Product Range <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="inline-flex items-center justify-center rounded-sm border border-white/70 px-5 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[var(--color-ink)]">Request a Quote</Link></div></div>
      <aside className="self-end border border-white/20 bg-[rgb(7_17_31_/_0.68)] p-5 backdrop-blur-sm"><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--color-signal)]">Procurement sequence</p><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100"><li>Select a vehicle or part family</li><li>Share application, drive form and destination</li><li>Receive a configuration-focused response</li></ul></aside>
    </div>
  </section>
}
