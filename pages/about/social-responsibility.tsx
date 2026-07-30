import AboutPageLayout from '@/components/about/AboutPageLayout';

export default function SocialResponsibilityPage() {
  return <AboutPageLayout title="Social Responsibility" description="A commitment to responsible operations, safer transport and sustainable commercial vehicle development." gallery={[{ src: '/images/reference/SOCIAL-RESPONSIBILITY-1.webp', alt: 'Social responsibility programme' }, { src: '/images/reference/Energy-Sector.webp', alt: 'Energy-sector application' }, { src: '/images/reference/Municipal-Services.webp', alt: 'Municipal-service application' }]}><section className="max-w-3xl"><h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Responsible progress</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">Commercial vehicles support essential transport, construction and public-service work. This page presents the reference site’s social-responsibility theme alongside relevant operating applications.</p></section></AboutPageLayout>;
}
