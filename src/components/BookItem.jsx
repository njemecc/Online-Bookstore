import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//sesija
import { useSession } from "next-auth/react";

//funkcija
import addBookToCart from "../../lib/addBookToCart";

import styles from "../components/BookItem.module.css";

import { toast } from "react-toastify";

export default function BookItem(props) {
  //sesija
  const { data: session } = useSession();

  const addBookToCartHandler = () => {
    toast.success(`${props.name} added to the cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    addBookToCart({
      email: session.user.email,
      props,
    });
  };

  return (
    <Card className={styles["book"]}>
      <div className={styles["book-img-div"]}>
        <img
          src={props.image}
          alt="book-image"
          className={styles["book-img"]}
        />
      </div>
      <CardContent className={styles["card-content"]}>
        <p className={styles["book-name"]}>{props.name}</p>
        <Typography variant="body2" color="text.secondary">
          {props.author}
        </Typography>
      </CardContent>
      <div className={styles["price-div"]}>
        <h4>{props.price}</h4>
      </div>
      <CardActions className={styles["button-div"]}>
        <Button onClick={addBookToCartHandler} size="small">
          Add to cart
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
