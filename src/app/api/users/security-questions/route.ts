import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, questions } = await req.json();

    if (!userId || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: 'User ID and questions are required' },
        { status: 400 }
      );
    }

    const client = await getDb().connect();

    try {
      // Start a transaction
      await client.query('BEGIN');

      // First, delete any existing security questions for this user
      await client.query(
        'DELETE FROM security_questions WHERE user_id = $1',
        [userId]
      );

      // Insert the new security questions
      for (const q of questions) {
        await client.query(
          `INSERT INTO security_questions (user_id, question, answer)
           VALUES ($1, $2, $3)`,
          [userId, q.question, q.answer.toLowerCase().trim()]
        );
      }

      // Update the user's security_questions_set flag
      await client.query(
        'UPDATE users SET security_questions_set = true WHERE id = $1',
        [userId]
      );

      await client.query('COMMIT');

      return NextResponse.json({ success: true });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save security questions' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
