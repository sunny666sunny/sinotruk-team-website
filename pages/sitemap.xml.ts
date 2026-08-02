import type { GetServerSideProps } from 'next'
import { prisma } from '@/lib/db'
import { absoluteUrl } from '@/lib/seo/site-url'
import { canonicalProductEntries, renderSitemap } from '@/lib/seo/sitemap'
import { productPublicPath } from '@/lib/content/mutation-effects'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [products, parts, news] = await Promise.all([
    prisma.product.findMany({ where: { isActive: true }, select: { id: true, name: true, specifications: true, categoryId: true, subcategoryId: true, updatedAt: true } }),
    prisma.part.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } }),
    prisma.news.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
  ])
  const entries = [
    '/', '/products', '/parts', '/news', '/about', '/service', '/contact',
    ...canonicalProductEntries(products).map((item) => ({ url: productPublicPath(item.categoryId, item.subcategoryId, item.id), lastModified: item.updatedAt })),
    ...parts.map((item) => ({ url: `/parts/${item.id.replace(/^part-/, '')}`, lastModified: item.updatedAt })),
    ...news.map((item) => ({ url: `/news/${item.slug}`, lastModified: item.updatedAt })),
  ].map((item) => typeof item === 'string' ? { url: absoluteUrl(item) } : { ...item, url: absoluteUrl(item.url) })
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.write(renderSitemap(entries))
  res.end()
  return { props: {} }
}

export default function Sitemap() { return null }
