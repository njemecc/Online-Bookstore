"use client";

import { useEffect, useState } from "react";

import BookItem from "./BookItem";

import styles from "../components/AllBooks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

const AllBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const books = useSelector((state) => state.cart.libraryBooksToShow);
  const dispatch = useDispatch();

  const getAllBooks = async () => {
    setIsLoading(true);
    const response = await fetch("/api/getAllBooks");
    const res = await response.json();
    dispatch(cartActions.changeBooksLibrary(res));
    dispatch(cartActions.changeBooksLibraryCopy(res));
    setIsLoading(false);
  };

  const booksToShow = books?.map((book) => (
    <BookItem
      id={book._id}
      price={book.price}
      key={book.id}
      name={book.name}
      image={book.image}
      author={book.author}
    />
  ));

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className={styles["books-wrapper"]}>
      {isLoading ? "Loading..." : booksToShow}
    </div>
  );
};

export default AllBooks;
