"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

//function
import getBookDetails from "../../../../lib/getBookDetails";

//components
import BookDetails from "@/components/BookDetails";
import Loader from "../../../app/loading";

//session
import { useSession } from "next-auth/react";
import { EmailOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

const BookDetailsPage = () => {
  const searchParams = useSearchParams();
  const [book, setBook] = useState([]);

  const starsValue = useSelector((state) => state.cart.starsValue);
  const didThisUserRated = useSelector((state) => state.cart.didThisUserRated);

  const { data: session } = useSession();
  const email = session?.user.email;
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    async function izvrsi() {
      const res = await getBookDetails(id);

      if (res != undefined) {
        setBook(res[0]);
      }
    }
    izvrsi();
  }, []);

  const stars = book.stars;

  if (stars != undefined) {
    const sviEmailiKojiSuGlasali = stars?.map((star) => Object.keys(star));

    const emailKojiSeTrazi = sviEmailiKojiSuGlasali[0].filter(
      (imejl) => imejl.toString() == email?.toString()
    );

    if (emailKojiSeTrazi.length > 0 && didThisUserRated == false) {
      dispatch(cartActions.changeDidUserRated());
    }

    const sveVrednostiKojeSeTraze = stars.map((star) => Object.values(star));

    if (starsValue == 0) {
      let vrednost = sveVrednostiKojeSeTraze[0].reduce(
        (acc, trenutni) => Number(acc) + Number(trenutni),
        0
      );

      dispatch(cartActions.setSumOfRatings(vrednost));

      dispatch(cartActions.setNumerOfRaters(sveVrednostiKojeSeTraze[0].length));

      dispatch(cartActions.setStarsValue());
    }
  }
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
          email={email}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BookDetailsPage;
