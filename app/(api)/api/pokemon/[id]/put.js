import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient';
import { prependAllAttributes } from '@utils/request/prependAttributes';
import NotFoundError from '@utils/response/NotFoundError';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import NoContentError from '@utils/response/NoContentError';
import parseAndReplace from '@utils/request/parseAndReplace';

export async function PUT(request, { params }) {
  try {
    const id = new ObjectId(params.id);
    const body = await request.json();
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').updateOne(
      {
        _id: id,
      },
      parsedBody
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
      { status: error.status || 400 }
    );
  }
}
