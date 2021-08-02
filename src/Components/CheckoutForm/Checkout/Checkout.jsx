import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  CircularProgress,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import useStyles from "./styles";

import { commerce } from "../../../lib/commerce";

const Checkout = ({ cart, order, handleCapturedCheckout, errorMessage }) => {
  const classes = useStyles();
  const history = useHistory();
  const steps = ["Shipping address", "Payment details"];
  const [activeStep, setActiveStep] = useState(0);
  const [token, setToken] = useState(null);
  const [shippingData, setshippingData] = useState({});

  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    try {
      const cartToken = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setToken(cartToken);
    } catch {
      history.push("/");
    }
  };
  const nextStep = () => setActiveStep((prev) => prev + 1);

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const nextProcess = (data) => {
    setshippingData(data);
    setActiveStep((prev) => prev + 1);
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            {" "}
            Order reference: {order.customer_reference}
          </Typography>
          <Button variant="outlined" type="button" component={Link} to="/">
            {" "}
            Back to Home{" "}
          </Button>
        </div>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (errorMessage) {
    return (
      <>
        <Typography style={{ padding: "20px 0" }} variant="h5">
          Error: {errorMessage}
        </Typography>
        <Button variant="outlined" type="button" component={Link} to="/">
          Back to Home
        </Button>
      </>
    );
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm token={token} nextProcess={nextProcess} />
    ) : (
      <PaymentForm
        token={token}
        shippingData={shippingData}
        nextStep={nextStep}
        prevStep={prevStep}
        handleCapturedCheckout={handleCapturedCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep}>
            {steps.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            { token } && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
