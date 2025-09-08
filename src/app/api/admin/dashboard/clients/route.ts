import { NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';

export async function GET() {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      const res = await client.query('SELECT company, contact, plan, to_char(since, \'YYYY-MM-DD\') as since FROM b2b_clients ORDER BY since DESC');
      return NextResponse.json(res.rows);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('GET /api/admin/dashboard/clients error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
