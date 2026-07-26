import type { NextApiRequest } from 'next'
import { verifyToken } from '@/lib/auth'

type RequestLike = { cookies?: Record<string, string | undefined>; headers: { authorization?: string | string[] } }

export function getRequestToken(req: RequestLike) {
  const cookie = req.cookies?.admin_session
  if (cookie) return cookie
  const authorization = req.headers.authorization
  if (typeof authorization === 'string' && authorization.startsWith('Bearer ')) return authorization.slice(7)
  return null
}

export function getAdminSession(req: NextApiRequest) {
  const token = getRequestToken(req)
  return token ? verifyToken(token) : null
}
