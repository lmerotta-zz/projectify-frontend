import { forwardRef } from "react";
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const TextField = forwardRef<
  HTMLDivElement,
  Omit<MUITextFieldProps, "ref"> & { name: string }
>(({ name, helperText, ...rest }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <MUITextField
      {...rest}
      ref={ref}
      name={name}
      error={typeof errors[name] !== "undefined"}
      helperText={errors[name]?.message || helperText}
    />
  );
});

export default TextField;
