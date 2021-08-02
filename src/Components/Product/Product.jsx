import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const Product = ({ product, handleProductAdded }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          title={product.name}
          image={product.media.source}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            align="left"
            variant="body2"
            color="textSecondary"
          />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton onClick={() => handleProductAdded(product.id, 1)}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
