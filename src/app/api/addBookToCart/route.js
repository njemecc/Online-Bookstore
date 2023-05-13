import { WarningAmberTwoTone } from "@mui/icons-material";
import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const usersBooksCollection = db.collection("users_books");

    const data = await request.json();

    if (!data) return;

    console.log(data);
    const { email, props: book } = data;

    const emailFinded = await usersBooksCollection
      .find({
        email: email,
      })
      .toArray();

    if (emailFinded.length > 0) {
      //   const dataToInsert = {
      //     email,
      //     books: [...emailFinded.books, book],
      //   };

      const response = await usersBooksCollection.updateOne(
        { email: email },
        { $set: { books: [...emailFinded[0].books, book] } }
      );
      return new Response(JSON.stringify(response));
    } else {
      const dataToInsert = {
        email,
        books: [book],
      };
      const response = await usersBooksCollection.insertOne(dataToInsert);
      return new Response(JSON.stringify(response));
    }

    // return new Response(JSON.stringify(response));

    //await disconnectDB();
  } catch (error) {
    console.error(error);
  }
}
