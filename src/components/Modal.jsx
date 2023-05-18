"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  display: "flex",
  gap: "1rem",
};

export default function BasicModal() {
  const [korisnik, setKorisnik] = useState();
  const { data } = useSession();
  const email = data?.user.email;
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.cart.modalOpen);
  const handleClose = () => dispatch(cartActions.setModalOpenFalse());

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
          <div className={styles["text-field-div"]}>
            <h2>Name:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.name}
              variant="outlined"
              disabled={true}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Last Name:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.surname}
              variant="outlined"
              disabled={true}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Adress:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.adress}
              variant="outlined"
              disabled={true}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Phone:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.phone}
              variant="outlined"
              disabled={true}
            />
          </div>
          <div className={styles["text-field-div"]}>
            <h2>Email:</h2>
            <TextField
              id="outlined-basic"
              label={korisnik?.email}
              variant="outlined"
              disabled={true}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
