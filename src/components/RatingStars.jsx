import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RatingStars({ value }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginTop: "1rem",
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        precision={0.1}
        size="large"
        onChange={(event, newValue) => {
          //   setValue(newValue);
        }}
        readOnly={true}
      />
    </Box>
  );
}
