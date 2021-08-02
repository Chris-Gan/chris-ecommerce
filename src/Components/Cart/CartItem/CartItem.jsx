import React from "react";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
} from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({ item, handleItemQty, removeItemFromCart }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="subtitle1">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            size="small"
            onClick={() => handleItemQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            size="small"
            onClick={() => handleItemQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          onClick={() => removeItemFromCart(item.id)}
          size="large"
          variant="contained"
          color="secondary"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
