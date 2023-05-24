import React from "react";
import Link from "next/link";
//styling

//components
import SignInButton from "./SignInButton";
import Modal from "../components/Modal";

//styles
import styles from "../components/Navbar.module.css";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart"
import { BsBook } from "@react-icons/all-files/bs/BsBook";

import { IconContext }
 from "@react-icons/all-files";

//redux
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(cartActions.setModalOpenTrue());

  return (
    <div className={styles["nav-wrapper"]}>
      <nav className={styles["shadow"]}>
        <div className={styles["nav-levi-cosak"]}>
          <Link href="/library">
            <IconContext.Provider value={{ color: "white", size: "3rem" }}>
              <div>
                <BsBook className={styles["logo"]} />
              </div>
            </IconContext.Provider>
          </Link>
          <a className={styles["profile-p"]} onClick={handleOpen}>
            Profile
          </a>
        </div>
        <div className={styles["nav-desni-cosak"]}>
          <Link href="/cart">
            <IconContext.Provider
              value={{ color: "white", size: "2rem", textAlign: "center" }}
            >
              <FaShoppingCart />
            </IconContext.Provider>
          </Link>
          <SignInButton />
          <Modal />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
