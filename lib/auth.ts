import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const TOKEN_EXPIRY = '24h'

function getJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim()
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be configured with at least 32 characters')
  return secret
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function generateToken(payload: { id: string; username: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY })
}

export function verifyToken(token: string): { id: string; username: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as { id: string; username: string }
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return null
}
