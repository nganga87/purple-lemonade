import jwt from 'jsonwebtoken';

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type JwtPayload = {
  sub: string; // user id
  name: string;
  email: string;
  role: string;
};

export function signJwt(payload: JwtPayload, maxAgeSeconds: number = DEFAULT_MAX_AGE_SECONDS) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.sign(payload, secret, { expiresIn: maxAgeSeconds });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}
