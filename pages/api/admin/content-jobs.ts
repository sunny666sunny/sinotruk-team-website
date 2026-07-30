import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/security/api-auth'

type Dependencies = { prisma: any; getAdminSession: typeof getAdminSession }

export function createContentJobsHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = { prisma, getAdminSession, ...overrides }
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
    const jobs = await dependencies.prisma.contentJob.findMany({ include: { source: { select: { name: true } }, news: { select: { slug: true } } }, orderBy: { updatedAt: 'desc' }, take: 100 })
    return res.status(200).json({ jobs })
  }
}

export default createContentJobsHandler()
