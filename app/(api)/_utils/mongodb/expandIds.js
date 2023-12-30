import { ObjectId } from 'mongodb';

import dbConnect from '@utils/mongodb/mongoClient';

// Takes object resembling example below with an "*expand" field:
// {
//   "*expand": {
//       "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
//       "from": "pokemon"
//     }
// }
// When an object that resembles the above object is encountered, return an array of documents
// from the "from" collection
async function expand(obj) {
  obj = obj['*expand'];
  const client = await dbConnect();
  const db = client.db();
  const documents = await db
    .collection(obj?.from)
    .find({
      _id: { $in: obj?.ids.map((id) => new ObjectId(id)) },
    })
    .toArray();
  return documents;
}

export default async function expandIds(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (val['*expand'] !== undefined) {
      obj[key] = await expand(val);
    } else {
      obj[key] = await expandIds(val);
    }
  }
  return obj;
}
