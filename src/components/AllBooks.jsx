'use client'

import { useEffect,useState} from "react";

import BookItem from "./BookItem";

import styles from "../components/AllBooks.module.css"

const AllBooks = () => {

    const [isLoading,setIsLoading] = useState(false)
    const [books,setBooks] = useState([])

    const getAllBooks = async () => {
        setIsLoading(true);
        const response = await fetch("/api/getAllBooks")
        const res = await response.json()
        setBooks(res)
        setIsLoading(false)

    }

    const booksToShow = books?.map(book => <BookItem price={book.price} key={book.id} name={book.name} image={book.image} author={book.author}  /> )
 
    useEffect(
        () => {
            getAllBooks()
        },[]
    )


  return <div className={styles["books-wrapper"]}>

  {isLoading ? "Loading..." : booksToShow}
  
  </div>
};

export default AllBooks;
