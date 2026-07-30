import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/security/api-auth'

type Dependencies = { prisma: any; getAdminSession: typeof getAdminSession }

export function createContentSourceHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = { prisma, getAdminSession, ...overrides }
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' })
    const id = String(req.query.id || '')
    const enabled = req.body?.enabled
    const dailyLimit = req.body?.dailyLimit
    if (!id || (enabled !== undefined && typeof enabled !== 'boolean') || (dailyLimit !== undefined && (!Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 10))) return res.status(400).json({ error: '请求参数无效。' })
    const source = await dependencies.prisma.newsSource.update({ where: { id }, data: { ...(enabled !== undefined ? { enabled } : {}), ...(dailyLimit !== undefined ? { dailyLimit } : {}), ...(req.body?.defaultCategory ? { defaultCategory: String(req.body.defaultCategory) } : {}) } })
    return res.status(200).json({ source })
  }
}

export default createContentSourceHandler()
