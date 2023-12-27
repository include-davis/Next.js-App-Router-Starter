const dbConnect = require('./mongoClient.js');

async function dbInit() {
  try {
    const client = await dbConnect();
    console.log('connected to db');
    const db = client.db();

    // Create collections if they don't already exist
    await db.createCollection('playlists');
    await db.createCollection('users');
    await db.createCollection('songs');
    console.log('created collections');

    await client.close();
  } catch (error) {
    console.log(error);
  }
}

dbInit();
