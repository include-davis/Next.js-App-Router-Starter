import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import dbConnect from '@utils/db/mongoClient';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const id = new ObjectId(params.id);
    const client = await dbConnect();
    const db = client.db();

    // if trying to append to pokemon
    if (body?.$push?.pokemon || body?.addToSet?.pokemon) {
      // transform all raw ids into ObjectIDs
      const pokemon_id_list = body.$push.pokemon.$each.map(
        (id) => new ObjectId(id)
      );

      // get list of pokemon data from ids
      const pokemon_list = await db
        .collection('pokemon')
        .find({
          _id: { $in: pokemon_id_list },
        })
        .toArray();

      body.$push.pokemon.$each = pokemon_list;
    }

    const trainer = await db.collection('trainers').updateOne(
      {
        _id: id,
      },
      body
    );

    if (trainer === null) {
      throw Error(`Trainer with id: ${params.id} not found.`);
    }

    return NextResponse.json({ ok: true, body: trainer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }
}
