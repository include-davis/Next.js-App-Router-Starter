const { MongoClient } = require('mongodb');

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_HOST}`;
let db = null;

async function dbConnect() {
  if (db) {
    console.log('Cache Hit!');
    return db;
  }
  const client = new MongoClient(uri);
  db = client.db();
  console.log('Cache Miss :(');
  return db;
}

module.exports = dbConnect;
