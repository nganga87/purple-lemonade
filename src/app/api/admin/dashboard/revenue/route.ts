import { NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';

export async function GET() {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      const res = await client.query('SELECT month as name, revenue FROM monthly_revenue ORDER BY id ASC');
      return NextResponse.json(res.rows);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('GET /api/admin/dashboard/revenue error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
