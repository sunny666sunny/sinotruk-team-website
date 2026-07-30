import AboutPageLayout from '@/components/about/AboutPageLayout';

const journeyImages = Array.from({ length: 15 }, (_, index) => ({ src: `/images/reference/h${index + 1}.webp`, alt: `SINOTRUK development milestone ${index + 1}`, label: `Development milestone ${index + 1}` }));

export default function OurJourneyPage() {
  return <AboutPageLayout title="Our Journey" description="A visual timeline of product and manufacturing development." gallery={journeyImages}><section className="max-w-3xl"><h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Development milestones</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">This timeline collects the visual milestones presented on the reference site. It provides a concise view of the product-development and manufacturing journey behind the vehicle range.</p></section></AboutPageLayout>;
}
