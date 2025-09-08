import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { signJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const body = await req.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const pool = getDb();
    const client = await pool.connect();
    try {
      const dbRes = await client.query(
        'SELECT id, name, email, password_hash, role, status FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (dbRes.rowCount === 0) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const user = dbRes.rows[0] as {
        id: string;
        name: string;
        email: string;
        password_hash: string;
        role: string;
        status: string;
      };

      const ok = await verifyPassword(password, user.password_hash);
      if (!ok) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      if (user.status !== 'Active') {
        return NextResponse.json({ error: `Account status is ${user.status}` }, { status: 403 });
      }

      const token = signJwt({ sub: user.id, name: user.name, email: user.email, role: user.role });
      const response = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role });
      response.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
