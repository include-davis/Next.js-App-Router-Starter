import { NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient';
import getQueries from '@utils/request/getQueries';

export async function GET(request) {
  try {
    const queries = getQueries(request);
    const db = await getDatabase();

    const trainers = await db
      .collection('trainers')
      .aggregate([
        { $match: queries },
        {
          $lookup: {
            from: 'pokemon',
            localField: '_id',
            foreignField: 'trainer_id',
            as: 'pokemon',
          },
        },
      ])
      .project({
        'pokemon.trainer_id': 0,
      })
      .toArray();

    return NextResponse.json({ ok: true, body: trainers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
