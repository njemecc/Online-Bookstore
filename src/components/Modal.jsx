"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

//styles

import styles from "../components/Modal.module.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

//session
import { useSession } from "next-auth/react";

//hooks
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
 
};

export default function BasicModal() {
  const [korisnik, setKorisnik] = useState();
  const { data } = useSession();
  const email = data?.user.email;
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.cart.modalOpen);
  const handleClose = () => dispatch(cartActions.setModalOpenFalse());
  const [isDisabled,setIsDisabled] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/getUser", {
        method: "POST",
        body: JSON.stringify(email),
      });

      const res = await response.json();
      setKorisnik(res[0]);

      console.log("Korisnik je", res);
    };

    if (email != undefined) {
      getUser();
    }
  }, [email]);

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles["my-profile"]}><h1 >My profile</h1></div> 
          <div className={styles["text-fields-wrapper"]}>
          <div className={styles["text-field-div"]}>
            <h2>Name:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.name}
              variant="outlined"
              disabled={isDisabled}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Last Name:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.surname}
              variant="outlined"
              disabled={isDisabled}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Adress:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.adress}
              variant="outlined"
              disabled={isDisabled}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Phone:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.phone}
              variant="outlined"
              disabled={isDisabled}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Email:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.email}
              variant="outlined"
              disabled={isDisabled}
            />
          </div>
          </div>
          <div className={styles["buttons-div"]}>
          <button onClick={ () => {setIsDisabled(false) }}>Change</button>
          <button>Submit</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
