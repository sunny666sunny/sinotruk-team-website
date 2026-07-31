import Head from 'next/head'
import { resolveSeo, serializeJsonLd } from '@/lib/seo/resolve'
import type { SeoInput } from '@/lib/seo/types'

export function SeoHead({ input }: { input: SeoInput }) {
  const seo = resolveSeo(input)
  return <Head><title>{seo.title}</title><meta name="description" content={seo.description} />{seo.keywords && <meta name="keywords" content={seo.keywords} />}<link key="canonical" rel="canonical" href={seo.canonical} /><meta name="robots" content={seo.robots} /><meta property="og:title" content={seo.openGraph.title} /><meta property="og:description" content={seo.openGraph.description} /><meta property="og:type" content={seo.openGraph.type} /><meta property="og:url" content={seo.openGraph.url} />{seo.openGraph.image && <meta property="og:image" content={seo.openGraph.image} />}<meta name="twitter:card" content={seo.twitter.card} /><meta name="twitter:title" content={seo.twitter.title} /><meta name="twitter:description" content={seo.twitter.description} />{seo.twitter.image && <meta name="twitter:image" content={seo.twitter.image} />}{seo.jsonLd.map((value, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }} />)}</Head>
}
