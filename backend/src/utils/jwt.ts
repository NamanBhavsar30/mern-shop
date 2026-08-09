import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_strong_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}
