"use client";
import React from "react";

//styles
import styles from "../components/BookDetails.module.css";

//toast
import { toast } from "react-toastify";

import { useEffect, useState } from "react";

//session
import { useSession } from "next-auth/react";

//function
import addBookToCart from "../../lib/addBookToCart";
import RatingStars from "./RatingStars";

const BookDetails = ({
  name,
  genre,
  number_of_pages,
  author,
  year,
  price,
  description,
  image,
  stars,
}) => {
  const { data: session } = useSession();
  //meni samo iz baze zapravo treba informacija da li je user vec kupio tu knjigu ili ne nista vise.
  const [thisUserRecords]

  const getCartRecords = async () => {
    const res = await fetch("/api/getCartRecordByEmail", {
      method: "POST",
      body: JSON.stringify(data.user.email),
    });

    const response = await res.json();

    return response;
  };

  useEffect(() => {
    //ovde ce mi opet trebati await
    const res = getCartRecords();
  }, []);

  let averageValue = 0;

  for (let i = 0; i < stars.length; i++) {
    averageValue += Number(stars[i]);
  }

  averageValue = averageValue / stars.length;

  const addBookToCartHandler = () => {
    toast.success(`${name} added to the cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const props = {
      name,
      genre,
      number_of_pages,
      author,
      year,
      price,
      description,
      image,
    };

    addBookToCart({
      email: session.user.email,
      props,
    });
  };

  return (
    <div className={styles["book-details-wrapper"]}>
      <div className={styles["image-div"]}>
        <img src={image} alt={name} />
      </div>
      <div className={styles["book-description-div"]}>
        <p>
          <h4>Description:</h4>
          {description}.
        </p>
        <div className={styles["div-opis"]}>
          <h4>Name:</h4>
          <p>{name}</p>
        </div>
        <div className={styles["div-opis"]}>
          <h4>Author:</h4>
          <p>{author}</p>
        </div>
        <div className={styles["div-opis"]}>
          <h4>Genre:</h4>
          <p>{genre}</p>
        </div>
        <div className={styles["div-opis"]}>
          <h4>Pages:</h4>
          <p>{number_of_pages}</p>
        </div>
        <div className={styles["div-opis"]}>
          <h4>Year</h4>
          <p>{year}</p>
        </div>
        <RatingStars value={averageValue} />

        <button
          onClick={addBookToCartHandler}
          className={styles["addToCart-button"]}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
