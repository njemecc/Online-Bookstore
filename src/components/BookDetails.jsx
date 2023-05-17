import React from "react";

//styles
import styles from "../components/BookDetails.module.css";

//toast
import { toast } from "react-toastify";

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
  starsNumber,
  didThisUserRated,
}) => {
  
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
        <RatingStars readOnly={didThisUserRated} value={starsNumber} />

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
