import { connectDB, disconnectDB, client } from "../../../../../DB/main";
import * as bcrypt from "bcryptjs";
import { signJwtAccessToken } from "../../../../../lib/jwt";

export async function POST(request) {
  await connectDB;
  const body = await request.json();
  const db = client.db("online_bookstore");
  const userCollection = db.collection("users");

  let { email, password } = body;

  const user = await userCollection
    .find({
      email: email,
    })
    .toArray();

  await disconnectDB();

  if (user.length != 0 && (await bcrypt.compare(password, user[0].password))) {
    const { password, ...userWithoutPass } = user;

    console.log(userWithoutPass[0]);

    const accesToken = signJwtAccessToken(userWithoutPass[0]);

    const result = {
      ...userWithoutPass,
      accesToken,
    };

    console.log("result:", result);
    const { 0: userWithoutJwt } = result;
    const userWithJwt = { ...userWithoutJwt, accesToken };

    return new Response(JSON.stringify(userWithJwt));
  } else {
    return new Response(JSON.stringify(null));
  }
}
