import { getDb } from '../src/lib/db';

async function checkDatabase() {
  console.log('Checking database connection and schema...');
  const client = await getDb().connect();
  
  try {
    // Check if users table exists
    const usersTable = await client.query(
      "SELECT to_regclass('public.users') as exists"
    );
    console.log('Users table exists:', !!usersTable.rows[0].exists);

    // Check if security_questions table exists
    const securityQuestionsTable = await client.query(
      "SELECT to_regclass('public.security_questions') as exists"
    );
    console.log('Security questions table exists:', !!securityQuestionsTable.rows[0].exists);

    // If security_questions table doesn't exist, create it
    if (!securityQuestionsTable.rows[0].exists) {
      console.log('Creating security_questions table...');
      await client.query('BEGIN');
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS security_questions (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(user_id, question)
        )
      `);

      // Add security_questions_set column if it doesn't exist
      await client.query(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS security_questions_set BOOLEAN NOT NULL DEFAULT false
      `);

      await client.query('COMMIT');
      console.log('Successfully created security_questions table');
    }
    
  } catch (error) {
    console.error('Error checking/creating database schema:', error);
    throw error;
  } finally {
    client.release();
    process.exit(0);
  }
}

checkDatabase().catch(console.error);
