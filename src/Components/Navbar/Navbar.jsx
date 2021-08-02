import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import useStyles from "./styles";

const Navbar = ({ totalItem }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            color="inherit"
            variant="h6"
          >
            <img
              className={classes.image}
              src="https://i.ibb.co/Qp1SXBw/commerce.png"
              alt="icon"
            />
            Chris Local
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={totalItem} color="secondary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
