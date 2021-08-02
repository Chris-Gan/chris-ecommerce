import React, { useState, useEffect } from "react";
import {
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ token, nextProcess }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const countriesForMapped = Object.entries(shippingCountries).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const subdivisionsForMapped = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const shippingOptionsForMapped = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - ${option.price.formatted_with_code}`,
  }));
  const fetchShippingCountries = async (token) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      token
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (token, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(token, {
      country,
      region,
    });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    if (token) {
      fetchShippingCountries(token.id);
    }
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchShippingSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(token.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);

  const onSubmit = (data, error) => {
    nextProcess({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormInput required={true} name="firstName" label="First name" />
            <FormInput required={true} name="lastName" label="Last name" />
            <FormInput required={true} name="address" label="Address" />
            <FormInput required={true} name="email" label="Email" />
            <FormInput required={true} name="city" label="City" />
            <FormInput required={true} name="zip" label="ZIP/ Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countriesForMapped.map(({ id, label }) => (
                  <MenuItem value={id} key={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisionsForMapped.map(({ id, label }) => (
                  <MenuItem value={id} key={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptionsForMapped.map(({ id, label }) => (
                  <MenuItem value={id} key={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Return to Cart
            </Button>
            <Button
              onClick={() => console.log("being clicked!!")}
              type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
