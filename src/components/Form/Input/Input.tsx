import { forwardRef, HTMLProps, ReactNode } from "react";
import * as Styles from "./Input.styles";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useFormContext } from "react-hook-form";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "name"> & {
  label: ReactNode;
  name: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, ...rest }, ref) => {
    const { errors } = useFormContext();
    return (
      <Styles.Wrapper>
        <Styles.InputWrapper layout>
          <Styles.Input
            ref={ref}
            {...rest}
            name={name}
            placeholder="&nbsp;"
            data-testid={`input-${name}`}
            invalid={errors[name]?.length > 0}
          />
          {label && (
            <Styles.Label className="label" data-testid={`label-${name}`}>
              {label}
            </Styles.Label>
          )}
        </Styles.InputWrapper>
        <ErrorMessage name={name} />
      </Styles.Wrapper>
    );
  }
);

export default Input;
