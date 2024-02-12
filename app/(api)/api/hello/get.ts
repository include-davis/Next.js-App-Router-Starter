import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ ok: true, body: 'hello world!' }, { status: 200 });
}
