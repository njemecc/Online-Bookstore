import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const usersBooksCollection = db.collection("users_books");

    const data = await request.json();
    console.log("DATAAA", data);

    if (!data) return;

    const email = data;

    const emailFinded = await usersBooksCollection
      .find({
        email: email,
      })
      .toArray();

    const newBooks = [];

    if (emailFinded.length > 0) {
      const response = await usersBooksCollection.updateOne(
        { email: email },
        { $set: { books: [] } }
      );
      return new Response(JSON.stringify(response));
    }

    await disconnectDB();
  } catch (error) {
    console.error(error);
  }
}
