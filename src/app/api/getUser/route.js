import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();

    console.log("MINJIMAOOO");

    const db = client.db("online_bookstore");

    const usersCollection = db.collection("users");

    const email = await request.json();

    const user = await usersCollection.find({ email: email }).toArray();

    await disconnectDB();

    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
