import { WarningAmberTwoTone } from "@mui/icons-material";
import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const usersBooksCollection = db.collection("users_books");

    const email = await request.json();

    if (!email) return;

    const emailFinded = await usersBooksCollection
      .find({
        email: email,
      })
      .toArray();

    console.log("books:", emailFinded[0].books);

    if (emailFinded[0] == undefined) {
      return new Response(JSON.stringify("greska"));
    }

    console.log("emailFinded je", emailFinded);

    const response = emailFinded[0].books;

    return new Response(JSON.stringify(response));

    // return new Response(JSON.stringify(response));

    //await disconnectDB();
  } catch (error) {
    console.error(error);
  }
}
