import { connectDB, disconnectDB, client } from "@/DB/main";
import { Jwt } from "jsonwebtoken";

const KEY = "SAdASidnsandsaiodnaOSPDMASOPD<SAm"

export async function POST(request) {
  let response;
  try {
    const data  = await request.json();
    const {username, password} = data

    response = {
        token:jwt.sign(
            {
            username,
             },
             KEY
        ),
        
    }
   
  } catch (error) {
    console.error(error);
  }
  

  return new Response(response);
}
