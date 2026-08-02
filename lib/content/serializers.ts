import type { Product } from '@/data/products'
import type { Part } from '@/data/parts'
import { normalizeProductDetailContent } from '@/lib/product-detail/generate'
import { canonicalizeSpecifications } from '@/lib/product-data/published-product'
import type { ProductDetailContent } from '@/lib/product-detail/types'

export type ProcurementProduct = Product & {
  normalizedSpecs: Record<string, string>
  applicationTags: string[]
  marketTags: string[]
}

export type ProcurementPart = Part & {
  compatibleModels: string[]
}

export function parseJsonField<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export type ProductRecord = {
  id: string
  name: string
  description: string
  categoryId: string
  subcategoryId: string
  image: string
  bannerImage: string | null
  specifications: string
  features: string
  detailedFeatures: string
  galleryImages: string
  detailContent?: string | null
  normalizedSpecs?: string | null
  applicationTags?: string | null
  marketTags?: string | null
  performanceItems: Array<{ title: string; description: string; image: string }>
}

type PartRecord = {
  id: string
  name: string
  partNumber: string
  category: string
  description: string
  image: string
  specifications: string
  compatibleModels?: string | null
}

export function retainReviewedDetailFields(stored: unknown, legacy: ProductDetailContent): unknown {
  if (!stored || typeof stored !== 'object') return stored
  const candidate = stored as Partial<ProductDetailContent>
  return Object.fromEntries(
    (Object.keys(legacy) as Array<keyof ProductDetailContent>)
      .filter((key) => candidate[key] !== undefined && JSON.stringify(candidate[key]) !== JSON.stringify(legacy[key]))
      .map((key) => [key, candidate[key]]),
  )
}

const routeCategory = (categoryId: string, subcategoryId: string) => {
  subcategoryId = subcategoryId.includes(':') ? subcategoryId.split(':').slice(1).join(':') : subcategoryId
  if (categoryId === 'new-energy') return 'new-energy-vehicle'
  if (categoryId === 'light-vehicle' && ['cargo-truck', 'light-cargo', 'light-tipper', 'tipper-truck'].includes(subcategoryId)) {
    return 'light-truck'
  }
  return categoryId
}

const routeSubcategory = (categoryId: string, subcategoryId: string) => {
  subcategoryId = subcategoryId.includes(':') ? subcategoryId.split(':').slice(1).join(':') : subcategoryId
  if (categoryId === 'light-vehicle' && subcategoryId === 'light-cargo') return 'cargo-truck'
  if (categoryId === 'light-vehicle' && subcategoryId === 'light-tipper') return 'tipper-truck'
  if (categoryId === 'special-vehicle' && subcategoryId === 'other-special') return 'other-truck'
  return subcategoryId
}

export function toProductDto(record: ProductRecord, options: { includeDetailContent?: boolean } = {}): ProcurementProduct {
  const rawProduct = toRawProduct(record)
  const fallbackNormalizedSpecs = canonicalizeSpecifications(rawProduct.specifications, rawProduct.category)
  const storedNormalizedSpecs = parseJsonField<Record<string, string>>(record.normalizedSpecs, {})
  const normalizedSpecs = Object.keys(storedNormalizedSpecs).length ? storedNormalizedSpecs : fallbackNormalizedSpecs
  const drive = normalizedSpecs['Drive type']
  const power = normalizedSpecs['Engine power'] || normalizedSpecs['Motor power']
  const product: ProcurementProduct = {
    ...rawProduct,
    normalizedSpecs: { ...normalizedSpecs, ...(drive ? { drive } : {}), ...(power ? { power } : {}) },
    applicationTags: parseJsonField<string[]>(record.applicationTags, []),
    marketTags: parseJsonField<string[]>(record.marketTags, []),
  }
  if (options.includeDetailContent) {
    product.detailContent = normalizeProductDetailContent(parseJsonField<unknown>(record.detailContent, {}), product)
  }
  return product
}

export function toRawProduct(record: ProductRecord): Product {
  return {
    id: record.id,
    name: record.name,
    category: routeCategory(record.categoryId, record.subcategoryId),
    subcategory: routeSubcategory(record.categoryId, record.subcategoryId),
    description: record.description,
    image: record.image,
    bannerImage: record.bannerImage || undefined,
    specifications: parseJsonField<Record<string, string>>(record.specifications, {}),
    features: parseJsonField<string[]>(record.features, []),
    detailedFeatures: parseJsonField<Record<string, string>>(record.detailedFeatures, {}),
    galleryImages: parseJsonField<string[]>(record.galleryImages, []),
    performanceItems: record.performanceItems.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image,
    })),
  }
}

export function toPartDto(record: PartRecord): ProcurementPart {
  return {
    id: record.id.replace(/^part-/, ''),
    name: record.name,
    partNumber: record.partNumber,
    category: record.category,
    description: record.description,
    image: record.image,
    specifications: parseJsonField<Record<string, string>>(record.specifications, {}),
    compatibleModels: parseJsonField<string[]>(record.compatibleModels, []),
  }
}
