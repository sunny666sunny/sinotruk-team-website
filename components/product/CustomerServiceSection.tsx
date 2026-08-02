import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteImage } from '@/components/SiteImage'

const services = [
  { title: 'Configuration consultation', description: 'Organize application, route, destination and option requirements before the quotation configuration is confirmed.', image: '/images/reference/After-sales-service-3.webp', href: '/contact' },
  { title: 'Parts identification', description: 'Use the vehicle reference, VIN when available, part number and photos to support a compatibility review.', image: '/images/reference/Parts-Accessories-1.webp', href: '/parts' },
  { title: 'Maintenance information', description: 'Locate published maintenance guidance and prepare the exact vehicle record needed for a technical enquiry.', image: '/images/reference/After-sales-service-4.webp', href: '/service/maintenance-manual' },
  { title: 'Delivery coordination', description: 'Align inspection inputs, product documents and transport requirements within the confirmed order scope.', image: '/images/reference/Service-Network.webp', href: '/contact' },
]

export function CustomerServiceSection({ productName }: { productName: string }) {
  return <section className="border-y border-[var(--industrial-line)] bg-[var(--industrial-surface)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--industrial-accent)]">From selection to operation</p><h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)] sm:text-5xl">SINOTRUK Customer Service</h2><p className="mt-5 leading-7 text-[var(--industrial-muted)]">Use these service paths to prepare a traceable enquiry for {productName}. Service scope is confirmed for each order and destination. These are enquiry preparation paths available through this website, not a universal manufacturer service or warranty statement.</p></div>
    <div className="mt-8 grid gap-px bg-[var(--industrial-line)] md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <article key={service.title} className="group flex flex-col bg-[var(--industrial-panel)]"><div className="relative aspect-[4/3] overflow-hidden bg-[#081113]"><SiteImage src={service.image} alt={`${service.title} support`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="flex flex-1 flex-col p-5"><h3 className="text-xl font-bold uppercase text-[var(--industrial-text)]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">{service.description}</p><Link href={service.href} className="mt-auto inline-flex min-h-11 items-end gap-2 pt-5 text-xs font-bold uppercase tracking-[.08em] text-[var(--industrial-accent)]">Open service path <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></article>)}</div>
  </div></section>
}
