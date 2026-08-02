export type SeoPageType = 'website' | 'collection' | 'product' | 'article' | 'part'

export interface SeoOverride {
  title?: string | null
  description?: string | null
  keywords?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: string | null
  canonical?: string | null
}

export interface SeoInput {
  path: string
  pageType: SeoPageType
  name: string
  description?: string | null
  image?: string | null
  noIndex?: boolean
  override?: SeoOverride | null
  datePublished?: string | null
  dateModified?: string | null
  source?: { title?: string | null; url?: string | null; datePublished?: string | null } | null
  items?: Array<{ name: string; url: string }>
  breadcrumbs?: Array<{ name: string; path: string }>
  productId?: string
  category?: string
  productImages?: Array<{ url: string; caption: string }>
  additionalProperties?: Array<{ name: string; value: string }>
  faqs?: Array<{ question: string; answer: string }>
}

export interface ResolvedSeo {
  title: string
  description: string
  keywords?: string
  canonical: string
  robots: string
  openGraph: {
    title: string
    description: string
    image?: string
    url: string
    type: 'website' | 'article' | 'product'
  }
  twitter: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    image?: string
  }
  jsonLd: Array<Record<string, unknown>>
}
