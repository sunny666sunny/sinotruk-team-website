import Link from 'next/link'
import { ArrowRight, Building2, Container, Mountain, Truck } from 'lucide-react'

const applications = [
  { icon: Building2, title: 'Construction and site haulage', description: 'Start with payload, body requirement, route and ground conditions.', href: '/products/heavy-truck' },
  { icon: Truck, title: 'Regional and long-haul transport', description: 'Compare tractor and cargo configurations around the planned operation.', href: '/products/heavy-truck' },
  { icon: Mountain, title: 'Mining and demanding terrain', description: 'Use operating conditions and support requirements to frame the RFQ.', href: '/products/special-vehicle' },
  { icon: Container, title: 'Port and project logistics', description: 'Review available vehicle families before discussing a project requirement.', href: '/products/special-vehicle' },
]

export default function IndustryApplications() {
  return <section className="bg-[var(--color-panel)] py-16 lg:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:items-end">
        <div><p className="text-sm font-semibold uppercase tracking-[.12em] text-[var(--color-signal-dark)]">Operational starting points</p><h2 className="mt-3 text-3xl font-bold tracking-[-.035em] text-[var(--color-ink)]">Compare vehicles in the context of the work.</h2></div>
        <p className="max-w-2xl leading-7 text-[var(--color-steel)]">These paths help structure an initial vehicle discussion. Final configuration, compliance and compatibility should be confirmed through the RFQ.</p>
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        {applications.map((application) => <Link key={application.title} href={application.href} className="group bg-[var(--color-canvas)] p-6 transition-colors hover:bg-[var(--color-signal-soft)]"><application.icon className="h-5 w-5 text-[var(--color-signal-dark)]" /><h3 className="mt-8 text-xl font-bold text-[var(--color-ink)]">{application.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--color-steel)]">{application.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-signal-dark)]">Review vehicle families <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}
      </div>
    </div>
  </section>
}
