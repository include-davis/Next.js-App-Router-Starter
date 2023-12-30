import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import dbConnect from '@utils/db/mongoClient';

export async function GET(_, { params }) {
  try {
    const id = new ObjectId(params.id);
    const client = await dbConnect();
    const db = client.db();

    const trainer = await db.collection('trainers').findOne({ _id: id });

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
