import { forwardRef, HTMLProps } from "react";
import * as Styles from "./Input.styles";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useFormContext } from "react-hook-form";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "name"> & {
  name: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, ...rest }, ref) => {
    const { errors } = useFormContext();
    return (
      <Styles.Wrapper layout>
        <Styles.InputWrapper layout>
          <Styles.Input
            ref={ref}
            {...rest}
            name={name}
            placeholder="&nbsp;"
            data-testid={`input-${name}`}
            invalid={typeof errors[name] !== "undefined"}
          />
        </Styles.InputWrapper>
        <ErrorMessage name={name} />
      </Styles.Wrapper>
    );
  }
);

export default Input;
