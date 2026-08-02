import { normalizeSiteUrl } from './site-url'
import type { SeoInput } from './types'

const SITE_NAME = 'SINOTRUK TEAM'

export function buildOrganizationSchema(siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: normalizeSiteUrl(siteUrl),
  }
}

export function buildWebSiteSchema(siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: normalizeSiteUrl(siteUrl),
  }
}

export function buildCollectionSchema(input: {
  name: string
  description: string
  url: string
  items: Array<{ name: string; url: string }>
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: input.url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }
}

export function buildPageSchema(input: SeoInput, url: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description,
    url,
  }
}

export function buildProductSchema(input: SeoInput, url: string, description: string, image?: string, siteUrl = url): Record<string, unknown> {
  const productImages = input.productImages?.length
    ? input.productImages.map((item) => ({ '@type': 'ImageObject', contentUrl: new URL(item.url, siteUrl).toString(), caption: item.caption }))
    : image ? [image] : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description,
    url,
    ...(productImages ? { image: productImages } : {}),
    ...(input.productId ? { sku: input.productId } : {}),
    ...(input.category ? { category: input.category } : {}),
    ...(input.additionalProperties?.length ? { additionalProperty: input.additionalProperties.map((item) => ({ '@type': 'PropertyValue', name: item.name, value: item.value })) } : {}),
    brand: { '@type': 'Brand', name: 'SINOTRUK' },
  }
}

export function buildFaqSchema(faqs: NonNullable<SeoInput['faqs']>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function buildArticleSchema(input: SeoInput, url: string, description: string, image?: string): Record<string, unknown> {
  const source = input.source
  const citation = source && (source.title || source.url || source.datePublished) ? {
    '@type': 'CreativeWork',
    ...(source.title ? { name: source.title } : {}),
    ...(source.url ? { url: source.url } : {}),
    ...(source.datePublished ? { datePublished: source.datePublished } : {}),
  } : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.name,
    description,
    url,
    ...(image ? { image: [image] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(citation ? { citation } : {}),
    author: { '@type': 'Organization', name: 'SINOTRUK TEAM Editorial' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }
}
