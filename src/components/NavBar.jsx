import React from "react";
import Link from "next/link";
//styling

//components
import SignInButton from "./SignInButton";
import styles from "../components/Navbar.module.css";
const NavBar = () => {
  return (
    <div className={styles["nav-wrapper"]}>
      <div className={styles["nav-levi-cosak"]}>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className={styles["nav-desni-cosak"]}>
        <SignInButton />
        <Link href="/signup">Signup/Signin</Link>
      </div>
    </div>
  );
};

export default NavBar;
