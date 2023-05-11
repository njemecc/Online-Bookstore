import { connectDB,disconnectDB,client } from "../../../../DB/main"
export async function POST(request) {

  try {
    await connectDB()
    const db = client.db("online_bookstore")
 
    const userCollection =  db.collection("books")

    const data = await request.json()

    if(!data) return
  
      const book  = await userCollection.insertOne(data)
      return new Response(JSON.stringify(book))
     
     await disconnectDB()   
  } catch (error) {
    console.error(error)
  }
 

   
  
}
