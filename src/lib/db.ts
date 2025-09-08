import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDb() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    pool = new Pool({ connectionString, max: 5 });
  }
  return pool;
}

export async function ensureSchema() {
  const client = await getDb().connect();
  try {
    await client.query('BEGIN');
    
    // Create users table first
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Active',
        phone TEXT,
        security_questions_set BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Create security_questions table right after users
    await client.query(`
      CREATE TABLE IF NOT EXISTS security_questions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, question)
      );
    `);

    // Create addresses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        nft_id TEXT,
        gps TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        type TEXT NOT NULL DEFAULT 'residential',
        is_primary BOOLEAN NOT NULL DEFAULT false,
        is_headquarters BOOLEAN NOT NULL DEFAULT false,
        personal_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Create indexes for addresses
    await client.query('CREATE INDEX IF NOT EXISTS addresses_user_id_idx ON addresses(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS addresses_status_idx ON addresses(status)');

    await client.query(`
      CREATE TABLE IF NOT EXISTS b2b_clients (
        id TEXT PRIMARY KEY,
        company TEXT NOT NULL,
        contact TEXT NOT NULL,
        plan TEXT NOT NULL,
        since DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS monthly_revenue (
        id SERIAL PRIMARY KEY,
        month TEXT NOT NULL,
        revenue INTEGER NOT NULL
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        nft_id TEXT NOT NULL,
        gps TEXT NOT NULL,
        status TEXT NOT NULL,
        type TEXT NOT NULL,
        is_primary BOOLEAN NOT NULL DEFAULT false,
        is_headquarters BOOLEAN NOT NULL DEFAULT false,
        personal_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    // Ensure user_id linkage exists
    await client.query(`ALTER TABLE addresses ADD COLUMN IF NOT EXISTS user_id TEXT`);


    // Temporary mobile uploads storage for phone camera capture via QR
    await client.query(`
      CREATE TABLE IF NOT EXISTS mobile_uploads (
        sid TEXT PRIMARY KEY,
        image_data TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
