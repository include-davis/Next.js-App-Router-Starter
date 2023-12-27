const { MongoClient } = require('mongodb');

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_HOST}`;
let cachedClient = null;

async function dbConnect() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  cachedClient = client;
  return client;
}

module.exports = dbConnect;
