import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, FileText, PackageCheck, Wrench } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PartImageStage } from '@/components/parts/PartImageStage';
import { getPartById, parts } from '@/data/parts';
import { SeoHead } from '@/components/seo/SeoHead';

const categoryNames: Record<string, string> = { engine: 'Engine', gearbox: 'Gearbox', axle: 'Axle', chassis: 'Chassis', 'cabin-body': 'Cabin & Body', other: 'Other' };

export default function PartDetailPage() {
  const router = useRouter();
  const { part } = router.query as { part: string };
  const partData = part ? getPartById(part) : undefined;
  if (router.isFallback || !partData) return <div className="industrial-page flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--industrial-accent)] border-t-transparent" /></div>;

  const path = `/parts/${part}`;

  return <>
    <SeoHead input={{ path, pageType: 'part', name: `${partData.name} ${partData.partNumber}`, description: partData.description, image: partData.image, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Parts', path: '/parts' }, { name: partData.name, path }] }} />
    <Header />
    <main id="main" className="industrial-page pt-16 lg:pt-[72px]">
      <nav aria-label="Breadcrumb" className="border-b border-[var(--industrial-line)] bg-[var(--industrial-surface)]">
        <div className="mx-auto flex min-w-0 max-w-7xl items-center gap-2 px-4 py-5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-muted)] sm:px-6 lg:px-8">
          <Link href="/">Home</Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          <Link href="/parts">Parts</Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="truncate text-[var(--industrial-text)]">{partData.name}</span>
        </div>
      </nav>

      <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-bg)]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,.85fr)]">
          <PartImageStage src={partData.image} alt={`${partData.name}, part number ${partData.partNumber}`} priority sizes="(min-width: 1024px) 58vw, 100vw" className="min-h-[24rem] sm:min-h-[32rem] lg:min-h-[38rem]" />
          <div className="flex min-w-0 flex-col justify-center border-t border-[var(--industrial-line)] px-4 py-10 sm:px-8 lg:border-l lg:border-t-0 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">{categoryNames[partData.category] || partData.category} part</p>
            <h1 className="mt-4 break-words text-5xl font-bold uppercase leading-[0.9] text-[var(--industrial-text)] sm:text-6xl">{partData.name}</h1>
            <div className="mt-8 border-y border-[var(--industrial-line)] py-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--industrial-muted)]">Part number:</p>
              <p className="mt-2 break-all font-mono text-2xl font-bold text-[var(--industrial-accent)] sm:text-3xl">{partData.partNumber}</p>
            </div>
            <p className="mt-7 leading-7 text-[var(--industrial-muted)]">{partData.description}</p>
            <Link href={`/contact?part=${encodeURIComponent(partData.id)}`} className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113]">Request compatibility review <ChevronRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--industrial-surface)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Published record</p>
            <h2 className="mt-3 text-4xl font-bold uppercase text-[var(--industrial-text)]">Product specifications</h2>
            <dl className="mt-7 overflow-hidden border border-[var(--industrial-line)] bg-[var(--industrial-panel)]">
              {Object.entries(partData.specifications).map(([key, value]) => (
                <div key={key} className="grid gap-2 border-b border-[var(--industrial-line)] px-5 py-4 last:border-0 md:grid-cols-[minmax(9rem,.7fr)_minmax(0,1.3fr)] md:gap-4">
                  <dt className="text-sm text-[var(--industrial-muted)]">{key}</dt>
                  <dd className="break-words text-sm font-bold text-[var(--industrial-text)] sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="h-fit border border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-6">
            <Wrench aria-hidden="true" className="h-6 w-6 text-[var(--industrial-accent)]" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--industrial-accent)]">Compatibility confirmation</p>
            <h2 className="mt-2 text-2xl font-bold uppercase text-[var(--industrial-text)]">Compatibility must be confirmed</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--industrial-muted)]">Catalogue details help identify a candidate part. Please provide the truck model or VIN so our team can review fitment for your specific vehicle.</p>
            <div className="mt-7 border-t border-[var(--industrial-line)] pt-6">
              <PackageCheck aria-hidden="true" className="h-5 w-5 text-[var(--industrial-accent)]" />
              <h3 className="mt-4 text-lg font-bold uppercase text-[var(--industrial-text)]">Before you enquire</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--industrial-muted)]">
                <li>Part number or product name</li>
                <li>Truck model or VIN</li>
                <li>Required quantity</li>
                <li>Destination country or port</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--industrial-line)] bg-[var(--industrial-bg)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link href="/parts" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to parts catalogue</Link>
          <Link href={`/contact?part=${encodeURIComponent(partData.id)}`} className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--industrial-accent)]">Prepare an RFQ <FileText aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}

export async function getStaticPaths() { return { paths: parts.map((part) => ({ params: { part: part.id } })), fallback: false }; }
export async function getStaticProps() { return { props: {} }; }
