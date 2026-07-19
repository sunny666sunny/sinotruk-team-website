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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query

  switch (req.method) {
    case 'GET': {
      const product = await prisma.product.findUnique({
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
      const previous = await prisma.product.findUnique({ where: { id: id as string }, select: { categoryId: true, subcategoryId: true } })
      const { name, categoryId, subcategoryId, description, image, bannerImage, specifications, features, detailedFeatures, galleryImages, isActive, sortOrder, performanceItems } = req.body
      // Delete existing performance items and recreate
      if (performanceItems) {
        await prisma.performanceItem.deleteMany({ where: { productId: id as string } })
      }
      const product = await prisma.product.update({
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
      await afterContentMutation(res, [
        '/products', `/products/${product.categoryId}`, productPublicPath(product.categoryId, product.subcategoryId, product.id),
        ...(previous ? [productPublicPath(previous.categoryId, previous.subcategoryId, product.id)] : []),
      ])
      return res.status(200).json({ product })
    }

    case 'DELETE': {
      const previous = await prisma.product.findUnique({ where: { id: id as string }, select: { categoryId: true, subcategoryId: true } })
      if (!previous) return res.status(404).json({ error: 'Product not found' })
      await archiveProduct(prisma, id as string)
      await afterContentMutation(res, ['/products', ...(previous ? [`/products/${previous.categoryId}`, productPublicPath(previous.categoryId, previous.subcategoryId, id as string)] : [])])
      return res.status(200).json({ success: true, archived: true, id })
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}
