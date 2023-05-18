import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

//redux
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

export default function RatingStars({ email, name }) {
  const starsValue = useSelector((state) => state.cart.starsValue);
  const didThisUserRated = useSelector((state) => state.cart.didThisUserRated);
  const dispatch = useDispatch();

  const starsChangedHandler = async (event, newValue) => {
    const response = await fetch("/api/addStar", {
      method: "POST",
      body: JSON.stringify({ email, name, ocena: newValue }),
    });

    const res = await response.json();

    dispatch(cartActions.changeDidUserRated());
    dispatch(cartActions.increaseSubTotal(newValue));
    dispatch(cartActions.setStarsValue());
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginTop: "1rem",
      }}
    >
      <Rating
        name="simple-controlled"
        value={starsValue}
        precision={0.1}
        size="large"
        onChange={starsChangedHandler}
        readOnly={didThisUserRated}
      />
    </Box>
  );
}
