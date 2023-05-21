"use client";
import React from "react";

import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";

//sesija
import { useSession } from "next-auth/react";

//toast
import { toast } from "react-toastify";

import removeFromCartFunction from "../../lib/removeFromCartFunction";

import styles from "../app/cart/cart.module.css";

const CartItem = ({ id, name, image, desc, price, sendTotal }) => {
  const { data } = useSession();
  const [quantity, setQuantity] = useState(1);

  console.log("price:", price);

  const initialTotalState =
    Number(price?.substring(0, price.length - 1)) * quantity;

  const [total, setTotal] = useState(initialTotalState);

  const booksToShow = useSelector((state) => state.cart.booksToShow);

  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    toast.warn(`${name} removed from cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const userEmail = data.user.email;
    removeFromCartFunction({ email: userEmail, name });

    const newBooks = booksToShow.filter((book) => book.name != name);

    dispatch(cartActions.changeBooks(newBooks));

    dispatch(
      cartActions.decreaseSubTotal(
        Number(price.substring(0, price.length - 1)) * quantity
      )
    );
  };

  const handleIncreaseToCart = () => {
    setQuantity(quantity + 1);
    setTotal(price.substring(0, price.length - 1) * (quantity + 1));
    dispatch(
      cartActions.increaseSubTotal(Number(price.substring(0, price.length - 1)))
    );
  };

  const handleDecreaseCart = () => {
    setQuantity(quantity - 1);
    setTotal(price.substring(0, price.length - 1) * (quantity - 1));
    dispatch(
      cartActions.decreaseSubTotal(Number(price.substring(0, price.length - 1)))
    );
  };

  return (
    <>
      <div className={styles["cart-item"]} key={id}>
        <div className={styles["cart-product"]}>
          <img src={image} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>{desc}</p>
            <button onClick={handleRemoveFromCart}>Remove</button>
          </div>
        </div>
        <div className={styles["cart-product-price"]}>${price}</div>
        <div className={styles["cart-product-quantity"]}>
          <button onClick={handleDecreaseCart}>-</button>
          <div className={styles["count"]}>{quantity}</div>
          <button onClick={handleIncreaseToCart}>+</button>
        </div>
        <div className={styles["cart-product-total-price"]}>{total}</div>
      </div>
    </>
  );
};

export default CartItem;
