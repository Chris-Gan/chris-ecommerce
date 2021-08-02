import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import useStyles from "./styles";

import CartItem from "./CartItem/CartItem";
const Cart = ({ cart, handleItemQty, removeItemFromCart, emptyCart }) => {
  const classes = useStyles();

  if (!cart.line_items) return "Loading...";

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart.{" "}
        <Link to="/" className={classes.link}>
          Start shopping now{" "}
        </Link>
        !!
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} md={3} key={item.id}>
              <CartItem
                item={item}
                handleItemQty={handleItemQty}
                removeItemFromCart={removeItemFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              variant="outlined"
              size="large"
              color="secondary"
              onClick={emptyCart}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} gutterBottom variant="h3">
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
