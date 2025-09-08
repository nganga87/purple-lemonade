import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const client = await getDb().connect();
    try {
      const result = await client.query(
        `SELECT ar.*, u.name as requester_name, u.email as requester_email,
                a.name as address_name, a.address as full_address
         FROM access_requests ar
         JOIN users u ON ar.requester_id = u.id
         JOIN addresses a ON ar.address_id = a.id
         WHERE ar.status = 'pending'`
      );
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching access requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch access requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action, requestId } = await request.json();
    
    if (!['approve', 'reject'].includes(action) || !requestId) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const client = await getDb().connect();
    try {
      await client.query('BEGIN');
      
      // Update the request status
      const result = await client.query(
        `UPDATE access_requests 
         SET status = $1, updated_at = NOW() 
         WHERE id = $2
         RETURNING *`,
        [action === 'approve' ? 'approved' : 'rejected', requestId]
      );

      if (result.rowCount === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          { error: 'Access request not found' },
          { status: 404 }
        );
      }

      await client.query('COMMIT');
      return NextResponse.json({ success: true });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating access request:', error);
    return NextResponse.json(
      { error: 'Failed to update access request' },
      { status: 500 }
    );
  }
}
