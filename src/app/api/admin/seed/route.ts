import { NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    await ensureSchema();
    const client = await getDb().connect();
    try {
      await client.query('BEGIN');
      // Seed monthly_revenue if empty
      const revCount = await client.query('SELECT COUNT(*)::int AS c FROM monthly_revenue');
      if ((revCount.rows[0]?.c ?? 0) === 0) {
        const rows = [
          ['Jan', 4000],
          ['Feb', 3000],
          ['Mar', 5000],
          ['Apr', 4500],
          ['May', 6000],
          ['Jun', 5500],
        ];
        for (const [month, revenue] of rows) {
          await client.query('INSERT INTO monthly_revenue (month, revenue) VALUES ($1, $2)', [month, revenue]);
        }
      }

      // Seed b2b_clients if empty
      const clientCount = await client.query('SELECT COUNT(*)::int AS c FROM b2b_clients');
      if ((clientCount.rows[0]?.c ?? 0) === 0) {
        const rows = [
          ['Global Logistics', 'd.smith@globallogistics.com', 'Enterprise', '2024-05-10'],
          ['E-Shop Now', 'manager@eshopnow.com', 'Standard', '2024-06-22'],
          ['Finance Corp', 'compliance@financecorp.com', 'Enterprise', '2024-07-01'],
        ];
        for (const [company, contact, plan, since] of rows) {
          await client.query(
            'INSERT INTO b2b_clients (id, company, contact, plan, since) VALUES ($1, $2, $3, $4, $5)',
            [`cli_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, company, contact, plan, since]
          );
        }
      }

      // Seed users if empty
      const userCount = await client.query('SELECT COUNT(*)::int AS c FROM users');
      if ((userCount.rows[0]?.c ?? 0) === 0) {
        const samples = [
          { id: `usr_seed_1`, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin-assistant', status: 'Active', password: 'Password#123' },
          { id: `usr_seed_2`, name: 'Bob Williams', email: 'bob@example.com', role: 'support-agent', status: 'Active', password: 'Password#123' },
          { id: `usr_seed_3`, name: 'Charlie Brown', email: 'charlie@example.com', role: 'support-agent', status: 'Inactive', password: 'Password#123' },
        ];
        for (const u of samples) {
          const pwHash = await hashPassword(u.password);
          await client.query(
            `INSERT INTO users (id, name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5, $6)`,
            [u.id, u.name, u.email.toLowerCase(), pwHash, u.role, u.status]
          );
        }
      }

      await client.query('COMMIT');
      return NextResponse.json({ ok: true });
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('POST /api/admin/seed error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
