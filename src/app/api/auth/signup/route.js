import { connectDB, disconnectDB, client } from "../../../../../DB/main";
import * as bcrypt from "bcrypt";
export async function POST(request) {
  try {
    await connectDB();
    const db = client.db("online_bookstore");

    const userCollection = db.collection("users");
    const data = await request.json();

    const { email, password, name, surname, adress, phone } = data;

    const emailFinded = await userCollection.find({ email: email }).toArray();
    console.log(emailFinded);

    if (emailFinded.length === 0) {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await userCollection.insertOne(data);

      const { password, ...result } = user;

      await disconnectDB();
      return new Response(JSON.stringify(result));
    } else {
      await disconnectDB();
      return new Response(
        JSON.stringify("User with this email is alredy registrated")
      );
    }
  } catch (error) {
    console.error(error);
  }
}
