import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Cog,
  FileText,
  PackageSearch,
  Send,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import type { NewsItem } from '@/data/news'
import type { ProcurementProduct } from '@/lib/content/serializers'

export type FeaturedVehicleRailProps = { products: ProcurementProduct[] }
export type EditorialSectionProps = { articles: NewsItem[] }

const productHref = (product: ProcurementProduct) =>
  `/products/${product.category}/${product.subcategory}/${product.id}`

export function CinematicHero({ products }: { products: ProcurementProduct[] }) {
  const lead = products[1] ?? products[0]
  const heroImage = lead?.bannerImage || lead?.image || '/images/products/Howo-TX-8x4-Tipper-Truck-1.webp'

  return (
    <section className="industrial-home-hero" aria-labelledby="home-title">
      <Image
        src={heroImage}
        alt={lead ? `${lead.name} commercial truck` : 'HOWO TX 8x4 tipper truck at a worksite'}
        fill
        priority
        sizes="100vw"
        className="industrial-home-cover industrial-home-hero-image"
      />
      <div className="industrial-home-hero-shade" aria-hidden="true" />
      <div className="industrial-home-hero-content">
        <p className="industrial-home-kicker">Commercial vehicle range</p>
        <h1 id="home-title">Built for the work ahead.</h1>
        <p>Explore trucks by application, configuration and operating conditions.</p>
        <div className="industrial-home-actions">
          <Link href="/products" className="industrial-home-action industrial-home-action-primary">
            Explore trucks <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/contact" className="industrial-home-action industrial-home-action-secondary">
            Request quote
          </Link>
        </div>
      </div>
    </section>
  )
}

export function FeaturedVehicleRail({ products }: FeaturedVehicleRailProps) {
  return (
    <section className="industrial-home-section industrial-home-vehicles" aria-labelledby="featured-vehicles-title">
      <div className="industrial-home-section-heading industrial-home-section-heading-compact">
        <div>
          <h2 id="featured-vehicles-title">Current platforms for demanding operations.</h2>
        </div>
      </div>

      {products.length ? (
        <div className="industrial-home-vehicle-rail">
          {products.map((product, index) => (
            <article className="industrial-home-vehicle-card" key={product.id}>
              <Link href={productHref(product)} aria-label={`View ${product.name}`}>
                <span className="industrial-home-vehicle-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 86vw"
                    className="industrial-home-cover"
                  />
                </span>
                <span className="industrial-home-vehicle-copy">
                  <small>{product.subcategory.replaceAll('-', ' ')}</small>
                  <strong>{product.name}</strong>
                  <span>{index === 0 ? 'View vehicle' : 'Review details'} <ArrowUpRight aria-hidden="true" /></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="industrial-home-empty">
          <PackageSearch aria-hidden="true" />
          <p>Published vehicle details are being prepared.</p>
          <Link href="/contact">Discuss your requirements</Link>
        </div>
      )}
    </section>
  )
}

export function BrandIdentitySection() {
  return (
    <section className="industrial-home-brand" aria-labelledby="brand-title">
      <div className="industrial-home-brand-image">
        <Image
          src="/images/reference/about-SINOTRUK.webp"
          alt="SINOTRUK heavy truck facility"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="industrial-home-cover"
        />
      </div>
      <div className="industrial-home-brand-copy">
        <h2 id="brand-title">Commercial vehicles shaped around the operation.</h2>
        <p>
          From heavy trucks and light transport to special vehicles, trailers and new energy platforms,
          the published range supports a wide set of transport and worksite requirements.
        </p>
        <Link href="/about" className="industrial-home-text-link">
          Learn about SINOTRUK <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function EngineeringSection() {
  const stages = [
    { title: 'Cabin assembly', image: '/images/reference/Cabin-Hoisting-Line.webp' },
    { title: 'Chassis assembly', image: '/images/reference/Chassis-Assy-Line.webp' },
    { title: 'Quality inspection', image: '/images/reference/Quality-Gate.webp' },
  ]

  return (
    <section className="industrial-home-section industrial-home-engineering" aria-labelledby="engineering-title">
      <div className="industrial-home-engineering-intro">
        <h2 id="engineering-title">See the work behind the vehicle.</h2>
        <p>Explore the facilities, assembly processes and testing equipment presented across our company pages.</p>
        <Link href="/about/our-facilities" className="industrial-home-text-link">
          Visit our facilities <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="industrial-home-engineering-grid">
        {stages.map((stage) => (
          <figure key={stage.title}>
            <span>
              <Image src={stage.image} alt={stage.title} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 50vw, 100vw" className="industrial-home-cover" />
            </span>
            <figcaption>{stage.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function ApplicationMatrix() {
  const applications = [
    { name: 'Construction', image: '/images/reference/Construction.webp' },
    { name: 'Mining', image: '/images/reference/Mining.webp' },
    { name: 'Logistics transportation', image: '/images/reference/Logistics-Transportation.webp' },
    { name: 'Port operations', image: '/images/reference/Port-Operations.webp' },
    { name: 'Energy sector', image: '/images/reference/Energy-Sector.webp' },
    { name: 'Municipal services', image: '/images/reference/Municipal-Services.webp' },
  ]

  return (
    <section className="industrial-home-section industrial-home-applications" aria-labelledby="applications-title">
      <div className="industrial-home-section-heading">
        <div>
          <h2 id="applications-title">Match the platform to the operating environment.</h2>
        </div>
        <Link href="/products" className="industrial-home-text-link">
          Compare categories <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="industrial-home-application-grid">
        {applications.map((application) => (
          <Link href="/products" key={application.name}>
            <Image src={application.image} alt={`${application.name} application`} fill sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw" className="industrial-home-cover" />
            <span className="industrial-home-image-shade" aria-hidden="true" />
            <strong>{application.name}</strong>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ProcurementSupportSection() {
  const steps = [
    {
      icon: PackageSearch,
      title: 'Find the platform',
      text: 'Browse the published vehicle categories and product pages.',
      href: '/products',
      link: 'Explore products',
    },
    {
      icon: ClipboardCheck,
      title: 'Build a shortlist',
      text: 'Keep candidate vehicles together while you compare requirements.',
      href: '/shortlist',
      link: 'Open shortlist',
    },
    {
      icon: Send,
      title: 'Send the requirement',
      text: 'Share application, configuration and destination details for follow-up.',
      href: '/contact',
      link: 'Start an enquiry',
    },
  ]

  return (
    <section className="industrial-home-section industrial-home-procurement" aria-labelledby="procurement-title">
      <div className="industrial-home-procurement-heading">
        <p className="industrial-home-kicker">Procurement path</p>
        <h2 id="procurement-title">A clearer route from catalogue to enquiry.</h2>
      </div>
      <ol>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <li key={step.title}>
              <span className="industrial-home-step-number">{String(index + 1).padStart(2, '0')}</span>
              <Icon aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <Link href={step.href}>{step.link} <ArrowRight aria-hidden="true" /></Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function PartsEntrySection() {
  const groups = [
    { icon: Cog, name: 'Engine and gearbox' },
    { icon: ShieldCheck, name: 'Axle and braking' },
    { icon: Wrench, name: 'Cabin and chassis' },
  ]

  return (
    <section className="industrial-home-parts" aria-labelledby="parts-title">
      <div className="industrial-home-parts-image">
        <Image src="/images/reference/Parts-Accessories-1.webp" alt="SINOTRUK truck parts and accessories" fill sizes="(min-width: 1024px) 50vw, 100vw" className="industrial-home-cover" />
      </div>
      <div className="industrial-home-parts-copy">
        <h2 id="parts-title">Keep the vehicle connected to the right components.</h2>
        <p>Search the existing parts catalogue by system, part number and compatible vehicle information.</p>
        <ul>
          {groups.map((group) => {
            const Icon = group.icon
            return <li key={group.name}><Icon aria-hidden="true" />{group.name}</li>
          })}
        </ul>
        <Link href="/parts" className="industrial-home-action industrial-home-action-primary">
          Browse parts <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function EditorialSection({ articles }: EditorialSectionProps) {
  return (
    <section className="industrial-home-section industrial-home-editorial" aria-labelledby="editorial-title">
      <div className="industrial-home-section-heading">
        <div>
          <p className="industrial-home-kicker">News and guides</p>
          <h2 id="editorial-title">Product context for the next decision.</h2>
        </div>
        <Link href="/news" className="industrial-home-text-link">
          Read all articles <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="industrial-home-article-grid">
        {articles.map((article, index) => (
          <article className={index === 0 ? 'industrial-home-article-featured' : ''} key={article.slug}>
            <Link href={`/news/${article.slug}`}>
              <span className="industrial-home-article-image">
                <Image src={article.image} alt="" fill sizes={index === 0 ? '(min-width: 1024px) 48vw, 100vw' : '(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw'} className="industrial-home-cover" />
              </span>
              <div className="industrial-home-article-copy">
                <time dateTime={article.date}>{article.date}</time>
                <h3>{article.title}</h3>
                <span>Read article <ArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export function FinalRfqSection() {
  return (
    <section className="industrial-home-rfq" aria-labelledby="rfq-title">
      <Image src="/images/products/Howo-NX-Tractor-Truck.webp" alt="" fill sizes="100vw" className="industrial-home-cover" />
      <div className="industrial-home-rfq-shade" aria-hidden="true" />
      <div className="industrial-home-rfq-copy">
        <FileText aria-hidden="true" />
        <h2 id="rfq-title">Bring us the route, load and operating conditions.</h2>
        <p>Send the known requirements. The enquiry form gives the team a practical starting point for follow-up.</p>
        <Link href="/contact" className="industrial-home-action industrial-home-action-primary">
          Start your RFQ <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
