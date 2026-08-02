import { allProducts } from '@/data/products'
import {
  toRawProduct,
  type ProductRecord,
} from '@/lib/content/serializers'
import { generateProductDetailContent } from '@/lib/product-detail/generate'
import { canonicalizeSpecifications, preparePublishedProduct } from '@/lib/product-data/published-product'

export type ReviewedProductDatabaseUpdate = {
  id: string
  data: {
    description: string
    image: string
    bannerImage: string | null
    specifications: string
    detailedFeatures: string
    galleryImages: string
    detailContent: string
    normalizedSpecs: string
  }
  performanceItems: Array<{ title: string; description: string; image: string }>
}

const auditedProductIds = new Set(allProducts.map((product) => product.id))

export function buildReviewedProductDatabaseUpdate(record: ProductRecord): ReviewedProductDatabaseUpdate {
  const rawProduct = toRawProduct(record)
  const reviewedProduct = preparePublishedProduct(rawProduct)
  const normalizedSpecs = canonicalizeSpecifications(reviewedProduct.specifications, reviewedProduct.category)
  const drive = normalizedSpecs['Drive type']
  const power = normalizedSpecs['Engine power'] || normalizedSpecs['Motor power']
  const detailContent = generateProductDetailContent(reviewedProduct)

  return {
    id: record.id,
    data: {
      description: reviewedProduct.description,
      image: reviewedProduct.image,
      bannerImage: reviewedProduct.bannerImage || null,
      specifications: JSON.stringify(reviewedProduct.specifications),
      detailedFeatures: JSON.stringify(reviewedProduct.detailedFeatures || {}),
      galleryImages: JSON.stringify(reviewedProduct.galleryImages || []),
      detailContent: JSON.stringify(detailContent),
      normalizedSpecs: JSON.stringify({
        ...normalizedSpecs,
        ...(drive ? { drive } : {}),
        ...(power ? { power } : {}),
      }),
    },
    performanceItems: detailContent.performanceItems,
  }
}

type ReviewedCatalogSyncDependencies = {
  readProducts: () => Promise<ProductRecord[]>
  createBackup: () => Promise<{ databaseCopy: string }>
  commit: (updates: ReviewedProductDatabaseUpdate[]) => Promise<void>
}

export async function synchronizeReviewedCatalog(dependencies: ReviewedCatalogSyncDependencies) {
  const rows = await dependencies.readProducts()
  const rowById = new Map(rows.map((row) => [row.id, row]))
  const missingIds = [...auditedProductIds].filter((id) => !rowById.has(id))
  if (missingIds.length) {
    throw new Error(`数据库产品集合与 60 款审核清单不一致，缺少：${missingIds.join(', ')}`)
  }

  const updates = [...auditedProductIds].map((id) => buildReviewedProductDatabaseUpdate(rowById.get(id)!))
  const backup = await dependencies.createBackup()
  await dependencies.commit(updates)

  return {
    reviewedProducts: updates.length,
    databaseCopy: backup.databaseCopy,
  }
}
