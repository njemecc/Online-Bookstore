import { connectDB,disconnectDB,client } from "../../../../DB/main"

export async function GET(request) {

  await connectDB()

  const db = client.db("online_bookstore")
  console.log(db)  
  return new Response("HELLo")
}
