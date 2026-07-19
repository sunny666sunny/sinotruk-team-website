import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSession } from '@/lib/security/api-auth'
import { prisma } from '@/lib/db'
import { afterContentMutation } from '@/lib/content/mutation-effects'

type PartArchiveClient = {
  part: {
    update(args: { where: { id: string }; data: { isActive: false } }): Promise<{ id: string }>
  }
}

export function archivePart(client: PartArchiveClient, id: string) {
  return client.part.update({ where: { id }, data: { isActive: false } })
}

type PartHandlerDependencies = {
  getAdminSession: typeof getAdminSession
  prisma: any
  afterContentMutation: typeof afterContentMutation
}

export function createPartHandler(overrides: Partial<PartHandlerDependencies> = {}) {
  const dependencies: PartHandlerDependencies = { getAdminSession, prisma, afterContentMutation, ...overrides }

  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query

  switch (req.method) {
    case 'GET': {
      const part = await dependencies.prisma.part.findUnique({ where: { id: id as string } })
      if (!part) return res.status(404).json({ error: '配件未找到' })
      return res.status(200).json({ ...part, specifications: JSON.parse(part.specifications) })
    }

    case 'PUT': {
      const { name, partNumber, category, description, image, specifications, isActive, sortOrder } = req.body
      const part = await dependencies.prisma.part.update({
        where: { id: id as string },
        data: {
          ...(name !== undefined && { name }),
          ...(partNumber !== undefined && { partNumber }),
          ...(category !== undefined && { category }),
          ...(description !== undefined && { description }),
          ...(image !== undefined && { image }),
          ...(specifications !== undefined && { specifications: JSON.stringify(specifications) }),
          ...(isActive !== undefined && { isActive }),
          ...(sortOrder !== undefined && { sortOrder }),
        },
      })
      await dependencies.afterContentMutation(res, ['/parts', `/parts/${part.id.replace(/^part-/, '')}`])
      return res.status(200).json({ part: { ...part, specifications: JSON.parse(part.specifications) } })
    }

    case 'DELETE': {
      const existing = await dependencies.prisma.part.findUnique({ where: { id: id as string }, select: { id: true } })
      if (!existing) return res.status(404).json({ error: 'Part not found' })
      await archivePart(dependencies.prisma, id as string)
      await dependencies.afterContentMutation(res, ['/parts', `/parts/${String(id).replace(/^part-/, '')}`])
      return res.status(200).json({ success: true, archived: true, id })
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}

export default createPartHandler()
