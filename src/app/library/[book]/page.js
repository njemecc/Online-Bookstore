"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

//function
import getBookDetails from "../../../../lib/getBookDetails";

//components
import BookDetails from "@/components/BookDetails";

const BookDetailsPage = () => {
  const searchParams = useSearchParams();
  const [book, setBook] = useState([]);

  const id = searchParams.get("id");

  useEffect(() => {
    async function izvrsi() {
      const res = await getBookDetails(id);

      setBook(res[0]);
      console.log("Res je ", res);
    }
    izvrsi();
    console.log("Book je ", book);
  }, []);

  return (
    <div>
      {book.length != 0 ? (
        <BookDetails
          name={book.name}
          genre={book.genre}
          number_of_pages={book.number_of_pages}
          author={book.author}
          year={book.year}
          price={book.price}
          description={book.description}
          image={book.image}
          stars={book.stars}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default BookDetailsPage;
