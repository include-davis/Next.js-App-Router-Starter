import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import dbConnect from '@utils/mongodb/mongoClient';
import { prependAllAttributes } from '@utils/mongodb/prependAttributes';
import NotFoundError from '@utils/response/NotFoundError';

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

    const subDocumentUpdate = prependAllAttributes(body, 'pokemon.$[pokemon].');
    const trainer_pokemon = await db
      .collection('trainers')
      .updateMany({}, subDocumentUpdate, {
        arrayFilters: [{ 'pokemon._id': id }],
      });

    if (pokemon.matchedCount === 0) {
      throw new NotFoundError(`Pokemon with id: ${params.id} not found.`);
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
