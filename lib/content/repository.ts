import { prisma } from '@/lib/db'
import { toPartDto, toProductDto } from './serializers'
import type { ProcurementPart, ProcurementProduct } from './serializers'
import type { NewsItem } from '@/data/news'

const productInclude = {
  performanceItems: { orderBy: { sortOrder: 'asc' as const } },
}

export async function getPublishedProducts(): Promise<ProcurementProduct[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    include: productInclude,
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
  return rows.map(toProductDto)
}

export async function getPublishedProduct(id: string): Promise<ProcurementProduct | null> {
  const row = await prisma.product.findFirst({ where: { id, isActive: true }, include: productInclude })
  return row ? toProductDto(row) : null
}

export async function getPublishedProductsByCategory(category: string): Promise<ProcurementProduct[]> {
  const products = await getPublishedProducts()
  return products.filter((product) => product.category === category)
}

export async function getPublishedCategory(id: string) {
  const row = await prisma.category.findUnique({ where: { id }, include: { subcategories: { orderBy: { sortOrder: 'asc' } } } })
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    categoryDescription: row.fullDesc || row.description,
    description: row.description || '',
    bannerImage: row.bannerImage,
    subcategories: row.subcategories.map((sub) => ({ id: sub.id.includes(':') ? sub.id.split(':').slice(1).join(':') : sub.id, name: sub.name })),
  }
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  const rows = await prisma.news.findMany({ where: { isPublished: true }, orderBy: { date: 'desc' } })
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    date: row.date,
    image: row.image,
    excerpt: row.excerpt,
    content: row.content,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.excerpt,
    category: row.category,
    sourceUrl: row.sourceUrl,
    sourceTitle: row.sourceTitle,
    sourceDate: row.sourceDate,
  }))
}

export async function getPublishedNewsItem(slug: string): Promise<NewsItem | null> {
  const row = await prisma.news.findFirst({ where: { slug, isPublished: true } })
  return row ? {
    slug: row.slug, title: row.title, date: row.date, image: row.image,
    excerpt: row.excerpt, content: row.content,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.excerpt,
    category: row.category,
    sourceUrl: row.sourceUrl,
    sourceTitle: row.sourceTitle,
    sourceDate: row.sourceDate,
  } : null
}

export async function getPublishedParts(): Promise<ProcurementPart[]> {
  const rows = await prisma.part.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] })
  return rows.map(toPartDto)
}

export async function getPublishedPart(id: string): Promise<ProcurementPart | null> {
  const row = await prisma.part.findFirst({ where: { OR: [{ id }, { id: `part-${id}` }], isActive: true } })
  return row ? toPartDto(row) : null
}

export async function getSeoOverride(path: string) {
  return prisma.seoMeta.findUnique({ where: { path } })
}
