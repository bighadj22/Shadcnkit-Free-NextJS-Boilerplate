import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from "@/lib/auth";

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  await requireAuth();
  return new NextResponse(JSON.stringify({ message: 'Hello' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}