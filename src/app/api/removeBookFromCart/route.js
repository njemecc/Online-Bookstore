import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const usersBooksCollection = db.collection("users_books");

    const data = await request.json();

    if (!data) return;

    const { email, name } = data;

    console.log("pravi data je", data);

    const emailFinded = await usersBooksCollection
      .find({
        email: email,
      })
      .toArray();

    console.log("pravi email finded:", emailFinded);

    const newBooks = emailFinded[0].books.filter((book) => book.name != name);

    if (emailFinded.length > 0) {
      const response = await usersBooksCollection.updateOne(
        { email: email },
        { $set: { books: newBooks } }
      );

      await disconnectDB();
      return new Response(JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
  }
}
