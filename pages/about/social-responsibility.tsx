import AboutPageLayout from '@/components/about/AboutPageLayout';

export default function SocialResponsibilityPage() {
  const gallery = Array.from({ length: 5 }, (_, index) => ({ src: `/images/reference/SOCIAL-RESPONSIBILITY-${index + 1}.webp`, alt: `Social responsibility programme ${index + 1}` }));
  return <AboutPageLayout title="Social Responsibility" description="A commitment to responsible operations, safer transport and sustainable commercial vehicle development." gallery={gallery}><section className="max-w-3xl"><h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Responsible progress</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">Commercial vehicles support essential transport, construction and public-service work. This page presents the reference site’s social-responsibility theme through the complete locally hosted image set.</p></section></AboutPageLayout>;
}
