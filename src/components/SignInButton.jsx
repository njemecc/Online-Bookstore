'use client'
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

//styling
import styles from "../components/SignInButton.module.css"

const SignInButton = () => {
const {data:session} = useSession()

console.log("session jecl",session)
console.log("user jee",session?.user)


 if(session && session.user)
{
    return (
        <div>
            <p>{session.user.name}</p>
            <a  className={styles["auth-btn"]} onClick={() => signOut()}>Sign out</a>
        </div>
    )
}

return   <a className={styles["auth-btn"]} onClick={() => signIn()}>Sign In</a>
};

export default SignInButton;
