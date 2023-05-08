import React from "react";
import Link from "next/link";
//styling

//components
import SignInButton from "./SignInButton";

//styles
import styles from "../components/Navbar.module.css";
import {BsBook} from "react-icons/bs";
import { IconContext } from "react-icons";

const NavBar = () => {
  
  return (
    <div className={styles["nav-wrapper"]}>
      <nav className={styles["shadow"]}>
      <div className={styles["nav-levi-cosak"]}>
        <Link href="/"><IconContext.Provider
      value={{ color: 'white', size: '3rem' }}
    >
      <div>
      <BsBook className={styles["logo"]}/>
      </div>
    </IconContext.Provider> </Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className={styles["nav-desni-cosak"]}>
      <Link href="/cart">Cart</Link>
        <SignInButton />
        
      </div>
      </nav>
    </div>
  );
};

export default NavBar;
