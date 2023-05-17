"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

//function
import getBookDetails from "../../../../lib/getBookDetails";

//components
import BookDetails from "@/components/BookDetails";


//session
import { useSession } from "next-auth/react";
import { EmailOutlined } from "@mui/icons-material";

const BookDetailsPage = () => {
  const searchParams = useSearchParams();
  const [book, setBook] = useState([]);

  const { data: session } = useSession();
  const email = session?.user.email;
  const id = searchParams.get("id");

  const [didThisUserRated,setDidThisUserRated] = useState(false);
  const[starsNumber,setStarsNumber] = useState(0)

  
  useEffect(() => {
    async function izvrsi() {
      const res = await getBookDetails(id);
    setBook(res[0]);
    } 
    izvrsi();
    
  }, []);

  const stars = book.stars

if (stars!= undefined){

  const sviEmailiKojiSuGlasali = stars?.map(star=> Object.keys(star))

  const emailKojiSeTrazi = sviEmailiKojiSuGlasali[0].filter(imejl => imejl.toString() == email?.toString())
  
  if(emailKojiSeTrazi != undefined && didThisUserRated == false){
    setDidThisUserRated(true)
  }


  const sveVrednostiKojeSeTraze = stars.map(star => Object.values(star))

  if(starsNumber == 0){

    let vrednost = sveVrednostiKojeSeTraze[0].reduce((acc,trenutni) => Number(acc) + Number(trenutni) ,0)
    console.log("VREDNOSTI KOJE SE TRAZE:",sveVrednostiKojeSeTraze)
    console.log("VREDNOST",vrednost)

    vrednost = vrednost / sveVrednostiKojeSeTraze[0].length

    setStarsNumber(vrednost)
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
          didThisUserRated={didThisUserRated}
          starsNumber={starsNumber}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default BookDetailsPage;
