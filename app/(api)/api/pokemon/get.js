import { NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient';
import getQueries from '@utils/request/getQueries';

export async function GET(request) {
  try {
    const queries = getQueries(request);
    const db = await getDatabase();

    const pokemon = await db.collection('pokemon').find(queries).toArray();

    return NextResponse.json({ ok: true, body: pokemon }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }
}
