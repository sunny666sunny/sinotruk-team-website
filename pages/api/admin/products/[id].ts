import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSession } from '@/lib/security/api-auth'
import { prisma } from '@/lib/db'
import { afterContentMutation, productPublicPath } from '@/lib/content/mutation-effects'

type ProductArchiveClient = {
  product: {
    update(args: { where: { id: string }; data: { isActive: false } }): Promise<{ id: string }>
  }
}

export function archiveProduct(client: ProductArchiveClient, id: string) {
  return client.product.update({ where: { id }, data: { isActive: false } })
}

type ProductHandlerDependencies = {
  getAdminSession: typeof getAdminSession
  prisma: any
  afterContentMutation: typeof afterContentMutation
  productPublicPath: typeof productPublicPath
}

export function createProductHandler(overrides: Partial<ProductHandlerDependencies> = {}) {
  const dependencies: ProductHandlerDependencies = {
    getAdminSession,
    prisma,
    afterContentMutation,
    productPublicPath,
    ...overrides,
  }

  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query

  switch (req.method) {
    case 'GET': {
      const product = await dependencies.prisma.product.findUnique({
        where: { id: id as string },
        include: { performanceItems: { orderBy: { sortOrder: 'asc' } }, category: true, subcategory: true },
      })
      if (!product) return res.status(404).json({ error: 'Product not found' })
      return res.status(200).json({
        ...product,
        specifications: JSON.parse(product.specifications),
        features: JSON.parse(product.features),
        detailedFeatures: JSON.parse(product.detailedFeatures),
        galleryImages: JSON.parse(product.galleryImages),
      })
    }

    case 'PUT': {
      const previous = await dependencies.prisma.product.findUnique({ where: { id: id as string }, select: { categoryId: true, subcategoryId: true } })
      const { name, categoryId, subcategoryId, description, image, bannerImage, specifications, features, detailedFeatures, galleryImages, isActive, sortOrder, performanceItems } = req.body
      // Delete existing performance items and recreate
      if (performanceItems) {
        await dependencies.prisma.performanceItem.deleteMany({ where: { productId: id as string } })
      }
      const product = await dependencies.prisma.product.update({
        where: { id: id as string },
        data: {
          ...(name !== undefined && { name }),
          ...(categoryId && { category: { connect: { id: categoryId } } }),
          ...(subcategoryId && { subcategory: { connect: { id: subcategoryId } } }),
          ...(description !== undefined && { description }),
          ...(image !== undefined && { image }),
          ...(bannerImage !== undefined && { bannerImage }),
          ...(specifications && { specifications: JSON.stringify(specifications) }),
          ...(features && { features: JSON.stringify(features) }),
          ...(detailedFeatures && { detailedFeatures: JSON.stringify(detailedFeatures) }),
          ...(galleryImages && { galleryImages: JSON.stringify(galleryImages) }),
          ...(isActive !== undefined && { isActive }),
          ...(sortOrder !== undefined && { sortOrder }),
          ...(performanceItems && {
            performanceItems: {
              create: performanceItems.map((item: any, i: number) => ({
                title: item.title,
                description: item.description,
                image: item.image,
                sortOrder: i,
              })),
            },
          }),
        },
      })
      await dependencies.afterContentMutation(res, [
        '/products', `/products/${product.categoryId}`, dependencies.productPublicPath(product.categoryId, product.subcategoryId, product.id),
        ...(previous ? [dependencies.productPublicPath(previous.categoryId, previous.subcategoryId, product.id)] : []),
      ])
      return res.status(200).json({ product })
    }

    case 'DELETE': {
      const previous = await dependencies.prisma.product.findUnique({ where: { id: id as string }, select: { categoryId: true, subcategoryId: true } })
      if (!previous) return res.status(404).json({ error: 'Product not found' })
      await archiveProduct(dependencies.prisma, id as string)
      await dependencies.afterContentMutation(res, ['/products', ...(previous ? [`/products/${previous.categoryId}`, dependencies.productPublicPath(previous.categoryId, previous.subcategoryId, id as string)] : [])])
      return res.status(200).json({ success: true, archived: true, id })
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}

export default createProductHandler()
