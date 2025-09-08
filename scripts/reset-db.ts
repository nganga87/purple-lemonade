import { getDb } from '../src/lib/db';

async function resetDatabase() {
  console.log('Resetting database schema...');
  const client = await getDb().connect();
  
  try {
    await client.query('BEGIN');
    
    // Drop tables in reverse order of dependency
    await client.query('DROP TABLE IF EXISTS security_questions CASCADE');
    await client.query('DROP TABLE IF EXISTS mobile_uploads CASCADE');
    await client.query('DROP TABLE IF EXISTS addresses CASCADE');
    await client.query('DROP TABLE IF EXISTS b2b_clients CASCADE');
    await client.query('DROP TABLE IF EXISTS monthly_revenue CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    
    // Recreate schema
    await client.query(`
      CREATE TABLE users (
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

    await client.query(`
      CREATE TABLE security_questions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, question)
      );
    `);

    // Add other tables as needed...
    
    await client.query('COMMIT');
    console.log('Database schema reset successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    client.release();
    process.exit(0);
  }
}

resetDatabase().catch(console.error);
