import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { getDb } from '@/lib/db';

async function runMigration() {
  console.log('Starting database migration...');
  const client = await getDb().connect();
  
  try {
    await client.query('BEGIN');
    
    // Create addresses table if it doesn't exist
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

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS addresses_user_id_idx ON addresses(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS addresses_status_idx ON addresses(status)');

    await client.query('COMMIT');
    console.log('✅ Database migration completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

runMigration().catch(console.error);
