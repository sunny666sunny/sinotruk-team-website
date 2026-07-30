import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/security/api-auth'

type Dependencies = { prisma: any; getAdminSession: typeof getAdminSession }

function validUrl(value: unknown) {
  try { const url = new URL(String(value)); return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null } catch { return null }
}

export function createContentSourcesHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = { prisma, getAdminSession, ...overrides }
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (req.method === 'GET') return res.status(200).json({ sources: await dependencies.prisma.newsSource.findMany({ orderBy: { updatedAt: 'desc' } }) })
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    const baseUrl = validUrl(req.body?.baseUrl)
    const feedUrl = validUrl(req.body?.feedUrl)
    const name = String(req.body?.name || '').trim()
    const dailyLimit = Number(req.body?.dailyLimit || 3)
    if (!name || !baseUrl || !feedUrl || !Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 10) return res.status(400).json({ error: '请填写有效的来源名称、HTTP(S) 地址和每日上限（1-10）。' })
    const source = await dependencies.prisma.newsSource.create({ data: { name, baseUrl, feedUrl, dailyLimit, enabled: false, defaultCategory: req.body?.defaultCategory || 'Industry Insights' } })
    return res.status(201).json({ source })
  }
}

export default createContentSourcesHandler()
