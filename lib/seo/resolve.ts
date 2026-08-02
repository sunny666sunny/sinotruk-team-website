import { absoluteUrl, normalizeSiteUrl } from './site-url'
import { buildArticleSchema, buildCollectionSchema, buildFaqSchema, buildOrganizationSchema, buildPageSchema, buildProductSchema, buildWebSiteSchema } from './schema'
import type { ResolvedSeo, SeoInput } from './types'

const SITE_NAME = 'SINOTRUK TEAM'
const DEFAULT_SHARE_IMAGE = '/images/products/Heavy-Truck.webp'

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
  const name = input.name.replace(/(?:\s*\|\s*SINOTRUK(?: TEAM)?)+$/i, '').trim()
  return `${name} | ${SITE_NAME}`
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
    return buildProductSchema(input, canonical, description, image, canonical)
  }

  if (input.pageType === 'article') {
    return buildArticleSchema(input, canonical, description, image)
  }

  if (input.pageType === 'collection') {
    return buildCollectionSchema({
      name: input.name,
      description,
      url: canonical,
      items: (input.items || []).map((item) => ({ name: item.name, url: absoluteUrl(item.url, canonical) })),
    })
  }

  return buildPageSchema(input, canonical, description)
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
  const schemaImage = imageValue ? absoluteUrl(imageValue, baseUrl) : undefined
  const image = schemaImage || absoluteUrl(DEFAULT_SHARE_IMAGE, baseUrl)
  const ogTitle = nonBlank(input.override?.ogTitle) || title
  const ogDescription = truncateDescription(nonBlank(input.override?.ogDescription) || description)
  const jsonLd = input.path === '/'
    ? [buildOrganizationSchema(baseUrl), buildWebSiteSchema(baseUrl), buildPageSchema(input, canonical, description)]
    : [buildPrimaryJsonLd(input, canonical, description, schemaImage)]

  if (input.breadcrumbs?.length) {
    jsonLd.push(buildBreadcrumbJsonLd(input.breadcrumbs, baseUrl))
  }

  if (input.faqs?.length) {
    jsonLd.push(buildFaqSchema(input.faqs))
  }

  return {
    title,
    description,
    ...(nonBlank(input.override?.keywords) ? { keywords: nonBlank(input.override?.keywords) } : {}),
    canonical,
    robots: input.noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large',
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
