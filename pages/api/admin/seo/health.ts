import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/security/api-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const [submissions, publishedNews] = await Promise.all([prisma.seoSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }), prisma.news.count({ where: { isPublished: true } })])
  return res.status(200).json({ health: { siteUrlConfigured: Boolean(process.env.SITE_URL), indexNowConfigured: Boolean(process.env.INDEXNOW_KEY), googleConfigured: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY), sitemap: '/sitemap.xml', robots: '/robots.txt', publishedNews }, submissions })
}
