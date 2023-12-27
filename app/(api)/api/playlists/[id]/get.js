import { NextResponse } from 'next/server';

import dbConnect from '@utils/mongoClient';

export async function GET(request) {
  try {
    const client = await dbConnect();
    const db = client.db();

    const playlist = await db.collection('playlists').find({
      name: 'my first playlist',
    });

    return NextResponse.json({ ok: true, body: playlist }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }
}
