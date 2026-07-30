import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/security/api-auth'
import { submitSitemapToGoogle, submitToIndexNow } from '@/lib/seo/submission'

type Dependencies = { prisma: any; getAdminSession: typeof getAdminSession; submitToIndexNow: typeof submitToIndexNow; submitSitemapToGoogle: typeof submitSitemapToGoogle }
export function createSeoSubmitHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = { prisma, getAdminSession, submitToIndexNow, submitSitemapToGoogle, ...overrides }
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    const providers = Array.isArray(req.body?.providers) ? req.body.providers.filter((value: unknown) => value === 'indexnow' || value === 'google') : []
    if (!providers.length) return res.status(400).json({ error: '请选择 IndexNow 或 Google Sitemap。' })
    const results = [] as Array<{ provider: string; status: string; message?: string }>
    for (const provider of providers) try {
      const output = provider === 'indexnow' ? await dependencies.submitToIndexNow(['/']) : await dependencies.submitSitemapToGoogle()
      const target = provider === 'google' ? (output as { sitemapUrl: string }).sitemapUrl : '/'
      await dependencies.prisma.seoSubmission.create({ data: { provider, submissionType: provider === 'indexnow' ? 'url_update' : 'sitemap', target, status: 'success', responseCode: output.status, message: JSON.stringify(output) } })
      results.push({ provider, status: 'success' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown submission error'
      await dependencies.prisma.seoSubmission.create({ data: { provider, submissionType: provider === 'indexnow' ? 'url_update' : 'sitemap', target: provider === 'indexnow' ? '/' : '/sitemap.xml', status: 'failed', message } })
      results.push({ provider, status: 'failed', message })
    }
    return res.status(200).json({ results })
  }
}
export default createSeoSubmitHandler()
