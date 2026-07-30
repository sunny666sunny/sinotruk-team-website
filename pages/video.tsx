import Head from 'next/head';
import Link from 'next/link';
import { SiteImage } from '@/components/SiteImage';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const videos = [
  { title: 'HOWO TX Tipper', image: '/images/products/Howo-TX-8x4-Tipper-Truck-1.webp', href: '/products/heavy-truck' },
  { title: 'HOWO NX Tractor', image: '/images/products/Howo-NX-Tractor-Truck.webp', href: '/products/heavy-truck' },
  { title: 'HOWO TX Mixer', image: '/images/products/howo-TX-mixer-truck-1.webp', href: '/products/special-vehicle' },
  { title: 'Heavy Truck Range', image: '/images/products/Heavy-Truck.webp', href: '/products/heavy-truck' },
  { title: 'Light Truck Range', image: '/images/products/Light-Truck.webp', href: '/products/light-truck' },
  { title: 'New Energy Vehicle', image: '/images/products/New-Energy-Vehicle.webp', href: '/products/new-energy-vehicle' },
];

export default function VideoPage() {
  return <div className="flex min-h-screen flex-col"><Head><title>Video | SINOTRUK TEAM</title><meta name="description" content="Explore commercial truck ranges, applications and product highlights." /></Head><Header /><main className="flex-grow bg-[var(--color-canvas)] pt-16 lg:pt-[72px]"><section className="relative isolate overflow-hidden bg-[var(--color-ink)]"><SiteImage src="/images/reference/banner-ser.webp" alt="Commercial truck in operation" fill priority sizes="100vw" className="-z-20 object-cover opacity-35" /><div className="absolute inset-0 -z-10 bg-[var(--color-ink)]/65" /><div className="mx-auto max-w-6xl px-4 py-20 text-white sm:px-6 lg:px-8"><p className="text-sm font-semibold tracking-[0.12em] text-teal-100">VIDEO</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">reviews on SINOTRUK</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100">Explore vehicle ranges and the working applications they are designed to support.</p></div></section><section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{videos.map((video) => <Link key={video.title} href={video.href} className="group overflow-hidden bg-white shadow-sm"><div className="relative aspect-video"><SiteImage src={video.image} alt={video.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="flex items-center justify-between p-5"><h2 className="font-bold text-[var(--color-ink)]">{video.title}</h2><span className="text-sm font-bold text-[var(--color-signal)]">Explore</span></div></Link>)}</div></section></main><Footer /></div>;
}
