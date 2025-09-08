import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ensureSchema();
    const id = params.id;
    const body = await req.json();
    const { name, email, phone, role, status } = body as any;

    const client = await getDb().connect();
    try {
      await client.query(
        `UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), phone = COALESCE($4, phone), role = COALESCE($5, role), status = COALESCE($6, status) WHERE id = $1`,
        [id, name ?? null, email?.toLowerCase() ?? null, phone ?? null, role ?? null, status ?? null]
      );
      const res = await client.query('SELECT id, name, email, phone, role, status FROM users WHERE id = $1', [id]);
      if (res.rowCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(res.rows[0]);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('PUT /api/admin/users/[id] error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ensureSchema();
    const id = params.id;
    const client = await getDb().connect();
    try {
      await client.query('DELETE FROM users WHERE id = $1', [id]);
      return NextResponse.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('DELETE /api/admin/users/[id] error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
