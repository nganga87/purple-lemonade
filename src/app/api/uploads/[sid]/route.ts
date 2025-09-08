import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';

// GET /api/uploads/[sid] -> returns image_data if present
export async function GET(_req: NextRequest, { params }: { params: { sid: string } }) {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      const res = await client.query('SELECT image_data FROM mobile_uploads WHERE sid = $1', [params.sid]);
      if (res.rowCount === 0) return NextResponse.json({ found: false }, { status: 404 });
      return NextResponse.json({ found: true, image_data: res.rows[0].image_data });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('GET /api/uploads/[sid] error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/uploads/[sid] -> stores/updates image_data for the session
export async function PUT(req: NextRequest, { params }: { params: { sid: string } }) {
  try {
    await ensureSchema();
    const body = await req.json();
    const { image_data } = body as { image_data?: string };
    if (!image_data || typeof image_data !== 'string') {
      return NextResponse.json({ error: 'image_data required' }, { status: 400 });
    }
    const client = await getDb().connect();
    try {
      await client.query(
        'INSERT INTO mobile_uploads (sid, image_data) VALUES ($1, $2) ON CONFLICT (sid) DO UPDATE SET image_data = EXCLUDED.image_data, created_at = NOW()',
        [params.sid, image_data]
      );
      return NextResponse.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('PUT /api/uploads/[sid] error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/uploads/[sid] -> optional cleanup
export async function DELETE(_req: NextRequest, { params }: { params: { sid: string } }) {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      await client.query('DELETE FROM mobile_uploads WHERE sid = $1', [params.sid]);
      return NextResponse.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('DELETE /api/uploads/[sid] error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
