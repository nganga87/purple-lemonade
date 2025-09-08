import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
    const payload = verifyJwt(token);
    if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 });
    return NextResponse.json({ authenticated: true, user: payload });
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
