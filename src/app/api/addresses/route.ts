import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, getDb } from '@/lib/db';
import { verifyJwt } from '@/lib/jwt';

// Helper function to verify authentication
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const payload = verifyJwt(token);
  if (!payload?.sub) {
    return { error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) };
  }

  return { userId: payload.sub };
}

export async function GET(req: NextRequest) {
  try {
    await ensureSchema();
    
    const auth = await verifyAuth(req);
    if ('error' in auth) return auth.error;

    const client = await getDb().connect();
    try {
      const res = await client.query(
        `SELECT 
          id, 
          name, 
          address, 
          nft_id as "nftId", 
          gps, 
          status, 
          type, 
          is_primary as "isPrimary", 
          is_headquarters as "isHeadquarters", 
          personal_id as "personalId", 
          created_at as "createdAt" 
        FROM addresses 
        WHERE user_id = $1 
        ORDER BY created_at DESC`,
        [auth.userId]
      );
      return NextResponse.json(res.rows);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('GET /api/addresses error:', e);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    
    const auth = await verifyAuth(req);
    if ('error' in auth) return auth.error;

    // Parse and validate request body
    const body = await req.json();
    const { 
      name, 
      address, 
      gps, 
      type = 'residential', 
      isPrimary = false,
      isHeadquarters = false,
      personalId = null
    } = body;

    // Validate required fields
    if (!name || !address || !gps) {
      return NextResponse.json(
        { error: 'Missing required fields: name, address, and gps are required' },
        { status: 400 }
      );
    }

    const client = await getDb().connect();
    try {
      await client.query('BEGIN');

      // If setting as primary, unset any existing primary address
      if (isPrimary) {
        await client.query(
          'UPDATE addresses SET is_primary = false WHERE user_id = $1',
          [auth.userId]
        );
      }

      // Insert new address
      const result = await client.query(
        `INSERT INTO addresses (
          user_id, 
          name, 
          address, 
          gps, 
          type, 
          is_primary, 
          is_headquarters, 
          personal_id,
          status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
        RETURNING 
          id, 
          name, 
          address, 
          gps, 
          type, 
          is_primary as "isPrimary", 
          is_headquarters as "isHeadquarters",
          personal_id as "personalId",
          status,
          created_at as "createdAt"`,
        [
          auth.userId,
          name,
          address,
          gps,
          type,
          isPrimary,
          isHeadquarters,
          personalId
        ]
      );

      await client.query('COMMIT');
      
      return NextResponse.json(result.rows[0], { status: 201 });

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating address:', error);
      return NextResponse.json(
        { error: 'Failed to create address' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in POST /api/addresses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
