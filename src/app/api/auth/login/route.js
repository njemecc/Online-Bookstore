
import { connectDB,disconnectDB,client } from "../../../../../DB/main"
import * as bcrypt from "bcrypt"

export async function POST(request){
    await connectDB
    const body = await request.json()
    const db = client.db("online_bookstore")
    const userCollection =  db.collection("users")
    
    const {email,password} = body

    const user = await userCollection.find({
        email:email
    }).toArray()


    if( user.length != 0 && (await bcrypt.compare(password,user[0].password))){
        const 
            {password,...userWithoutPass} = user

            console.log("userwithoutpass:" ,    userWithoutPass[0])
            return new Response(JSON.stringify(userWithoutPass[0]))
        
    }else{
        return new Response(JSON.stringify("User with that credentials does not exists."))
    }








    await disconnectDB


}