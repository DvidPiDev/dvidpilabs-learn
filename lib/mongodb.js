import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return {client: cachedClient, db: cachedDb};
  }

  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error("ya done goofed up pal - check the mongo string")
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  });
  const db = client.db("labs-learn");

  cachedClient = client;
  cachedDb = db;

  return {client, db};
}