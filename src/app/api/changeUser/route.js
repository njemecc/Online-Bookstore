import { connectDB,disconnectDB,client } from "../../../../DB/main"
export async function POST(request) {

  try {
    await connectDB()
    const db = client.db("online_bookstore")
 
    const usersCollection =  db.collection("users")

    const data = await request.json()

    console.log(data)

    if(!data) return
  
    
    const emailFinded = await usersCollection
    .find({
      email: data.email,
    })
    .toArray();

    if (emailFinded.length > 0) {
        const updatedUser = await usersCollection.updateOne({email:data.email},{$set:data})
        return new Response(JSON.stringify(updatedUser))
    }else{
        const response = await usersCollection.insertOne(data)
        return new Response(JSON.stringify(updatedUser))
    }

 
     
    //  await disconnectDB()   
  } catch (error) {
    console.error(error)
  }
 

   
  
}
