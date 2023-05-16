"use client";
import { useEffect } from "react";

import styles from "../cart/cart.module.css";
//sesija
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";

import { useState } from "react";

import CartItem from "@/components/CartItem";

import { cartActions } from "@/store/slices/cartSlice";

import Link from "next/link";

import { useSelector, dispatch, useDispatch } from "react-redux";
import clearCart from "../../../lib/clearCart";
import addCartRecord from "../../../lib/addCartRecord";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { data } = useSession();
  const booksToShow = useSelector((state) => state.cart.booksToShow);
  console.log("BrontoSHOO", booksToShow);

  const subtotal = useSelector((state) => state.cart.subtotal);

  useEffect(() => {
    const fetcherFunction = async () => {
      const response = await fetch("/api/getCartBooks", {
        method: "POST",
        body: JSON.stringify(data.user.email),
      });

      const res = await response.json();

      dispatch(cartActions.changeBooks(res));
      dispatch(
        cartActions.increaseSubTotal(
          res.reduce(
            (acc, book) =>
              acc + Number(book.price.substring(0, book.price.length - 1)),
            0
          )
        )
      );
      setIsLoading(false);
    };

    data ? fetcherFunction() : setIsLoading(true);
  }, [data]);

  const clearCartHandler = () => {
    const email = data.user.email;
    dispatch(cartActions.emptyCart());
    clearCart(email);
    // toast.warn(`Your cart is empty.`, {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  };

  const checkoutHandler = () => {
    const email = data.user.email;
    addCartRecord({ email, books: booksToShow, totalPrice: subtotal });

    toast.success("Your order has been sent successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    clearCartHandler();
  };

  return (
    <div className={styles["cart-container"]}>
      <h2>Shopping Cart</h2>
      {booksToShow.length === 0 ? (
        <div className={styles["cart-empty"]}>
          <p>Your cart is currently empty</p>
          <div className={styles["start-shopping"]}>
            <Link href="/library">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles["titles"]}>
            <h3 className={styles["product-title"]}>Product</h3>
            <h3 className={styles["price"]}>Price</h3>
            <h3 className={styles["quantity"]}>Quantity</h3>
            <h3 className={styles["total"]}>Total</h3>
          </div>
          <div className={styles["cart-items"]}>
            {booksToShow.length != 0 &&
              booksToShow.map((cartItem) => (
                <CartItem
                  name={cartItem.name}
                  id={cartItem.id}
                  image={cartItem.image}
                  desc={cartItem.desc}
                  price={cartItem.price}
                />
              ))}
          </div>
          <div className={styles["cart-summary"]}>
            <button className={styles["clear-btn"]} onClick={clearCartHandler}>
              Clear Cart
            </button>
            <div className={styles["cart-checkout"]}>
              <div className={styles["subtotal"]}>
                <span>Subtotal ${subtotal}</span>
                <span className={styles["amount"]}>
                  {/* ${cart.cartTotalAmount} */}
                </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button
                onClick={checkoutHandler}
                className={styles["checkout-button"]}
              >
                Check out
              </button>
              <div className={styles["continue-shopping"]}>
                <Link href="/library">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
