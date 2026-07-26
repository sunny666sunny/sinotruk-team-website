import { absoluteUrl, normalizeSiteUrl } from './site-url'
import type { ResolvedSeo, SeoInput } from './types'

const SITE_NAME = 'SINOTRUK'

function nonBlank(value?: string | null): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function truncateDescription(value: string): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= 160) return normalized
  return `${normalized.slice(0, 159).trimEnd()}…`
}

function generatedTitle(input: SeoInput): string {
  if (input.path === '/') return 'SINOTRUK Trucks, Parts & Export Solutions'
  return `${input.name} | ${SITE_NAME}`
}

function generatedDescription(input: SeoInput): string {
  const supplied = nonBlank(input.description)
  if (supplied) return truncateDescription(supplied)

  switch (input.pageType) {
    case 'product':
      return `Explore ${input.name} specifications, applications and export options from SINOTRUK.`
    case 'article':
      return `Read the latest SINOTRUK update about ${input.name}.`
    case 'part':
      return `View ${input.name} details and request genuine SINOTRUK parts support.`
    default:
      return `Explore ${input.name}, SINOTRUK trucks, parts and international support.`
  }
}

function buildPrimaryJsonLd(input: SeoInput, canonical: string, description: string, image?: string): Record<string, unknown> {
  if (input.pageType === 'product' || input.pageType === 'part') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: input.name,
      description,
      url: canonical,
      ...(image ? { image } : {}),
      brand: { '@type': 'Brand', name: SITE_NAME },
    }
  }

  if (input.pageType === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: input.name,
      description,
      url: canonical,
      ...(image ? { image: [image] } : {}),
      ...(input.datePublished ? { datePublished: input.datePublished } : {}),
      ...(input.dateModified ? { dateModified: input.dateModified } : {}),
      publisher: { '@type': 'Organization', name: SITE_NAME },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description,
    url: canonical,
  }
}

function buildBreadcrumbJsonLd(items: NonNullable<SeoInput['breadcrumbs']>, siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  }
}

export function resolveSeo(input: SeoInput, siteUrl = process.env.SITE_URL): ResolvedSeo {
  const baseUrl = normalizeSiteUrl(siteUrl)
  const title = nonBlank(input.override?.title) || generatedTitle(input)
  const description = truncateDescription(nonBlank(input.override?.description) || generatedDescription(input))
  const canonical = absoluteUrl(nonBlank(input.override?.canonical) || input.path, baseUrl)
  const imageValue = nonBlank(input.override?.ogImage) || nonBlank(input.image)
  const image = imageValue ? absoluteUrl(imageValue, baseUrl) : undefined
  const ogTitle = nonBlank(input.override?.ogTitle) || title
  const ogDescription = truncateDescription(nonBlank(input.override?.ogDescription) || description)
  const jsonLd = [buildPrimaryJsonLd(input, canonical, description, image)]

  if (input.breadcrumbs?.length) {
    jsonLd.push(buildBreadcrumbJsonLd(input.breadcrumbs, baseUrl))
  }

  return {
    title,
    description,
    ...(nonBlank(input.override?.keywords) ? { keywords: nonBlank(input.override?.keywords) } : {}),
    canonical,
    robots: 'index,follow,max-image-preview:large',
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(image ? { image } : {}),
      url: canonical,
      type: input.pageType === 'article' ? 'article' : input.pageType === 'product' || input.pageType === 'part' ? 'product' : 'website',
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description: ogDescription,
      ...(image ? { image } : {}),
    },
    jsonLd,
  }
}

export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
