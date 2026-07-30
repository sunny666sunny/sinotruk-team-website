import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/security/api-auth';
import { readRfqSelection } from '@/lib/procurement/rfq';

type Dependencies = { prisma: any; getAdminSession: typeof getAdminSession };

export function createInquiriesHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = { prisma, getAdminSession, ...overrides };
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!dependencies.getAdminSession(req)) return res.status(401).json({ error: 'Unauthorized' });
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const rows = await dependencies.prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json({ inquiries: rows.map((row: any) => ({ ...row, selectionPayload: readRfqSelection(row.selectionPayload) })) });
  };
}

export default createInquiriesHandler();
