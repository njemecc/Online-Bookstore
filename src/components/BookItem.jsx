import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from "../components/BookItem.module.css"

export default function BookItem(props) {
  return (
    <Card  className={styles["book"]} >
      <div className={styles["book-img-div"]}>
      <img src={props.image} alt="book-image" className={styles["book-img"]} />
      </div>
      <CardContent className={styles["card-content"]}>
        <p className={styles['book-name']}>
          {props.name}
        </p>
        <Typography variant="body2" color="text.secondary">
          {props.author}
        </Typography>
      </CardContent>
      <div className={styles["price-div"]}>
      <h4>{props.price}</h4>
      </div>
      <CardActions>
        <Button sx={{color:"green"}} size="small">Add to cart</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}