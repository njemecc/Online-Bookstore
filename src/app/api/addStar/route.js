import { ConstructionOutlined } from "@mui/icons-material";
import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");

    const booksCollection = db.collection("books");

    const data = await request.json();

    if (!data) return;

    const { email, name, ocena } = data;

    const book = await booksCollection.find({ name: name }).toArray();

    const stars = book[0]["stars"];

    stars[email] = ocena;

    console.log("STARS", stars);

    const response = await booksCollection.updateOne(
      { name: name },
      { $set: { stars: stars } }
    );

    return new Response(JSON.stringify(response));

    await disconnectDB();
  } catch (error) {
    console.error(error);
  }
}
