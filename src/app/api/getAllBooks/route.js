import { connectDB,disconnectDB,client } from "../../../../DB/main"
export async function GET() {

  try {
    await connectDB()
    const db = client.db("online_bookstore")
 
    const booksCollection =  db.collection("books")

      const books  = await booksCollection.find().toArray()

      console.log(books)

      return new Response(JSON.stringify(books))
     
     await disconnectDB()   
  } catch (error) {
    console.error(error)
  }
 

   
  
}
