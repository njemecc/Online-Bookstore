import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI

export const client = new MongoClient(uri);

export async function connectDB() {
  console.log("DB CONNECTED");
  await client.connect();
  return;
}
export async function disconnectDB() {
  console.log("DB DISCONNECTED");
  await client.close();
  return;
}
