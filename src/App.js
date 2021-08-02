import "./styles.css";
import { Navbar, Products, Cart, Checkout } from "./Components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data: productsFetched } = await commerce.products.list();
    setProducts(productsFetched);
  };

  const fetchCart = async () => {
    const cartCreated = await commerce.cart.retrieve();
    setCart(cartCreated);
  };

  const handleProductAddedIntoCart = async (productID, quantity) => {
    const cartUpdated = await commerce.cart.add(productID, quantity);
    setCart(cartUpdated.cart);
  };

  const handleItemQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeItemFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCapturedCheckout = async (checkoutTokenId, orderMade) => {
    try {
      const order = await commerce.checkout.capture(checkoutTokenId, orderMade);

      setOrder(order);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar totalItem={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              handleProductAdded={handleProductAddedIntoCart}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleItemQty={handleItemQty}
              removeItemFromCart={removeItemFromCart}
              emptyCart={emptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              handleCapturedCheckout={handleCapturedCheckout}
              errorMessage={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
