import type { Product } from '@/data/products'
import type { Part } from '@/data/parts'

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

type ProductRecord = {
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

export function toProductDto(record: ProductRecord): ProcurementProduct {
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
    normalizedSpecs: parseJsonField<Record<string, string>>(record.normalizedSpecs, {}),
    applicationTags: parseJsonField<string[]>(record.applicationTags, []),
    marketTags: parseJsonField<string[]>(record.marketTags, []),
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
