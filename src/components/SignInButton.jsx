'use client'
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
const {data:session} = useSession()

console.log("session je",session)


 if(session && session.user)
{
    return (
        <div>
            <p>{session.user.name}</p>
            <button onClick={() => signOut}>Sign out</button>
        </div>
    )
}

return   <button onClick={() => signIn()}>Sign In</button>
};

export default SignInButton;
