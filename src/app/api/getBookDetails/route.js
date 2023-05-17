import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const booksCollection = db.collection("books");

    const id = await request.json();

    if (!id) return;

    const allBooks = await booksCollection.find().toArray();

    const book = allBooks.filter((book) => book._id.toString().includes(id));


    await disconnectDB();

    return new Response(JSON.stringify(book));

   
  } catch (error) {
    console.error(error);
  }
}
