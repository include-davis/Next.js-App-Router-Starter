import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import dbConnect from '@utils/db/mongoClient';
import { nestAllUpdaters } from '@utils/db/nestFields';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const id = new ObjectId(params.id);
    const client = await dbConnect();
    const db = client.db();

    const pokemon = await db.collection('pokemon').updateOne(
      {
        _id: id,
      },
      body
    );

    // nestAllUpdaters transforms our request body mongodb syntax such that it
    // updates the subdocuments within our trainer object rather than the trainer obj itself
    // This was written by me so it might not always work
    const trainer_pokemon = await db
      .collection('trainers')
      .updateMany({}, nestAllUpdaters(body, 'pokemon.$[pokemon].'), {
        arrayFilters: [{ 'pokemon._id': id }],
      });

    if (pokemon === null) {
      throw Error(`Pokemon with id: ${params.id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: [pokemon, trainer_pokemon] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }
}
