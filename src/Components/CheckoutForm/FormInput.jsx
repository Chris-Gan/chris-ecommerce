import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";

const FormInput = ({ name, required, label }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        render={({ field }) => (
          <TextField
            defaultValue=""
            {...field}
            label={label}
            fullWidth
            required
          />
        )}
        control={control}
      />
    </Grid>
  );
};

export default FormInput;
