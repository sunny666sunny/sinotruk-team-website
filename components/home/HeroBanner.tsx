import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] py-24 text-white md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(17,24,32,.98),rgba(17,24,32,.78)),url('/images/products/Heavy-Truck.webp')] bg-cover bg-center" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-300">Commercial truck export procurement</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">Specify the right truck. Build the right shipment.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">SINOTRUK TEAM helps overseas buyers navigate vehicle selection, configuration questions, spare parts and RFQ coordination without publishing unverified prices or promises.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--color-signal)] px-5 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-signal-dark)]">Explore Product Range <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-sm border border-white/70 px-5 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[var(--color-ink)]">Request a Quote</Link>
          </div>
        </div>
        <aside className="self-end border border-white/20 bg-black/20 p-5 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-300">Start with your requirement</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100"><li>01 — Select a vehicle or part family</li><li>02 — Share application, drive form and destination</li><li>03 — Receive a configuration-focused response</li></ul>
        </aside>
      </div>
    </section>
  );
}
