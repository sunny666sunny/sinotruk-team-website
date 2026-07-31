import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteImage } from '@/components/SiteImage';

const slides = [
  {
    image: '/images/products/Howo-TX-8x4-Tipper-Truck-1.webp',
    eyebrow: 'Heavy Truck',
    title: 'HOWO TX 8×4 Tipper Truck',
    description: 'Explore the commercial truck range and find the configuration suited to your working conditions.',
    href: '/products/heavy-truck',
  },
  {
    image: '/images/products/Howo-NX-Tractor-Truck.webp',
    eyebrow: 'Tractor Truck',
    title: 'HOWO NX Tractor Truck',
    description: 'Built around the heavy-duty transport applications that keep freight moving.',
    href: '/products/heavy-truck',
  },
  {
    image: '/images/products/howo-TX-mixer-truck-1.webp',
    eyebrow: 'Special Vehicle',
    title: 'HOWO TX Mixer Truck',
    description: 'Browse specialist vehicle options for demanding construction and delivery operations.',
    href: '/products/special-vehicle',
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];
  const selectSlide = (offset: number) => setActiveSlide((current) => (current + offset + slides.length) % slides.length);

  return (
    <section className="relative isolate min-h-[580px] overflow-hidden bg-[var(--color-ink)] text-white sm:min-h-[650px]">
      {slides.map((item, index) => <SiteImage key={item.image} src={item.image} decorative fill priority={index === activeSlide} sizes="100vw" className={`-z-20 object-cover transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`} />)}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,39,.86),rgba(16,35,39,.42)_52%,rgba(16,35,39,.12))]" />
      <div className="mx-auto flex min-h-[580px] max-w-7xl items-end px-4 pb-20 pt-40 sm:min-h-[650px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-teal-100">{slide.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{slide.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-100">{slide.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={slide.href} className="inline-flex items-center gap-2 bg-[var(--color-signal)] px-5 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-signal-dark)]">Explore Product Range <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center border border-white/70 px-5 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[var(--color-ink)]">Request a Quote</Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl items-center justify-between px-4 pb-7 sm:px-6 lg:px-8">
        <div className="flex gap-1" role="group" aria-label="Hero slides">{slides.map((item, index) => <button key={item.title} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show ${item.title}`} aria-current={index === activeSlide} className="group grid min-h-11 min-w-11 place-items-center"><span aria-hidden="true" className={`h-1.5 transition-all ${index === activeSlide ? 'w-10 bg-white' : 'w-5 bg-white/50 group-hover:bg-white'}`} /></button>)}</div>
        <div className="flex gap-2"><button type="button" onClick={() => selectSlide(-1)} className="grid h-11 w-11 place-items-center border border-white/50 hover:bg-white hover:text-[var(--color-ink)]" aria-label="Previous slide"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => selectSlide(1)} className="grid h-11 w-11 place-items-center border border-white/50 hover:bg-white hover:text-[var(--color-ink)]" aria-label="Next slide"><ArrowRight className="h-4 w-4" /></button></div>
      </div>
    </section>
  );
}
