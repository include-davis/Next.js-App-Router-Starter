import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient';
import NotFoundError from '@utils/response/NotFoundError';

export async function GET(_, { params }) {
  try {
    const id = new ObjectId(params.id);
    const db = await getDatabase();

    const trainer = await db.collection('trainers').findOne({ _id: id });

    if (trainer === null) {
      throw NotFoundError(`Trainer with id: ${params.id} not found.`);
    }

    return NextResponse.json({ ok: true, body: trainer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
