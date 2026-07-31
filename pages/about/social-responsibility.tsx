import AboutPageLayout from '@/components/about/AboutPageLayout'

export default function SocialResponsibilityPage() {
  const gallery = Array.from({ length: 5 }, (_, index) => ({ src: `/images/reference/SOCIAL-RESPONSIBILITY-${index + 1}.webp`, alt: `Social responsibility programme ${index + 1}` }))
  return <AboutPageLayout title="Social Responsibility" description="Published material about responsible operations and commercial vehicle development." gallery={gallery}><section className="max-w-3xl"><h2 className="text-3xl font-extrabold text-[var(--color-ink)]">Responsibility in context</h2><p className="mt-5 leading-8 text-[var(--color-steel)]">Commercial vehicles support transport, construction and public-service work. This page presents the reference site&apos;s social-responsibility theme through the complete locally hosted image set.</p></section></AboutPageLayout>
}
