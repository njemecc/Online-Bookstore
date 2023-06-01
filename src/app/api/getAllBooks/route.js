import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function GET() {
  try {
    const datum = new Date();
    await connectDB();
    console.log("Await connectDb", new Date() - datum);
    const db = client.db("online_bookstore");

    console.log("db", new Date() - datum);

    const booksCollection = db.collection("books");

    console.log("collection", new Date() - datum);

    const books = await booksCollection.find().toArray();

    console.log("books", new Date() - datum);

    console.log(books);

    await disconnectDB();
    return new Response(JSON.stringify(books));
  } catch (error) {
    console.error(error);
  }
}
