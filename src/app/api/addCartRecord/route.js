import { WarningAmberTwoTone } from "@mui/icons-material";
import { connectDB, disconnectDB, client } from "../../../../DB/main";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");
    const cartRecordCollection = db.collection("cart_records");

    const data = await request.json();

    if (!data) return;

    const response = await cartRecordCollection.insertOne({
      data,
    });
    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
}
