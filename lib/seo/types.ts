export type SeoPageType = 'website' | 'product' | 'article' | 'part'

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
  override?: SeoOverride | null
  datePublished?: string | null
  dateModified?: string | null
  breadcrumbs?: Array<{ name: string; path: string }>
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
