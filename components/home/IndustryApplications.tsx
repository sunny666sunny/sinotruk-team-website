import { SiteImage } from '@/components/SiteImage'

const applications = [
  { title: 'Construction', description: 'Dump trucks and concrete mixer trucks provide reliable solutions for infrastructure and building projects worldwide.', image: '/images/reference/Construction.webp' },
  { title: 'Logistics & Transportation', description: 'Tractor heads and cargo trucks deliver efficient long-haul and distribution services across global supply chains.', image: '/images/reference/Logistics-Transportation.webp' },
  { title: 'Mining', description: 'Heavy-duty mining trucks and dump trucks engineered for extreme conditions in mining operations globally.', image: '/images/reference/Mining.webp' },
  { title: 'Port Operations', description: 'Specialized terminal tractors and container handlers optimize cargo movement in ports and logistics hubs.', image: '/images/reference/Port-Operations.webp' },
  { title: 'Energy Sector', description: 'Fuel tankers and specialized vehicles support oil, gas, and renewable energy projects across diverse terrains.', image: '/images/reference/Energy-Sector.webp' },
  { title: 'Municipal Services', description: 'Garbage trucks, sweepers, and firefighting vehicles enhance urban maintenance and public safety services.', image: '/images/reference/Municipal-Services.webp' },
]

export default function IndustryApplications() {
  return <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="text-center"><h2 className="section-title inline-block pb-4 text-gray-900">Industry Applications</h2><p className="section-subtitle">Widely used in various industries to create maximum value for customers</p></div><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{applications.map((application) => <article key={application.title} className="group overflow-hidden rounded-lg bg-gray-50 shadow-sm"><div className="relative aspect-[16/10] overflow-hidden"><SiteImage src={application.image} alt={application.title} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-6"><h3 className="text-xl font-bold text-gray-900">{application.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{application.description}</p></div></article>)}</div></div></section>
}
