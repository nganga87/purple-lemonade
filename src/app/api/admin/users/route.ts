import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';

export async function GET() {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      const res = await client.query('SELECT id, name, email, phone, role, status FROM users ORDER BY created_at DESC');
      return NextResponse.json(res.rows);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('GET /api/admin/users error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const body = await req.json();
    const { name, email, phone, role = 'support-agent', status = 'Pending Approval', password } = body as any;
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await getDb().connect();
    try {
      const id = `usr_${Date.now()}`;
      // For admin-created users, store a temporary hash (reuse signup hash util through an import if needed). For simplicity here, set as disabled login until user sets password via separate flow.
      await client.query(
        `INSERT INTO users (id, name, email, password_hash, role, status, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, name, email.toLowerCase(), 'temp_disabled', role, status, phone || null]
      );
      return NextResponse.json({ id, name, email, phone, role, status }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('POST /api/admin/users error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
