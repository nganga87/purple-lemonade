import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { inferAccountTypeFromEmail } from '@/lib/email';
import { signJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const body = await req.json();
    const { name, email, password, accountType: clientAccountType } = body as {
      name: string;
      email: string;
      password: string;
      accountType?: 'individual' | 'company';
    };

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pool = getDb();
    const client = await pool.connect();

    try {
      const existing = await client.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
      if (existing.rowCount && existing.rowCount > 0) {
        return NextResponse.json({ error: 'Account with this email already exists.' }, { status: 409 });
      }

      const role = clientAccountType ?? inferAccountTypeFromEmail(email);
      const id = `usr_${Date.now()}`;
      const passwordHash = await hashPassword(password);

      await client.query(
        `INSERT INTO users (id, name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, name, email.toLowerCase(), passwordHash, role, 'Active']
      );

      const token = signJwt({ sub: id, name, email: email.toLowerCase(), role });
      const res = NextResponse.json({ id, name, email, role });
      res.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    } finally {
      client.release();
    }
  } catch (e: any) {
    console.error('Signup error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
