/** @jsxImportSource @emotion/react */
import { ComponentProps, forwardRef } from "react";
import tw, { TwStyle } from "twin.macro";

type ButtonColor = "primary" | "secondary";

type ButtonProps = ComponentProps<"button"> & {
  color?: ButtonColor;
};

const colorMapping: {
  [key in ButtonColor]: TwStyle;
} = {
  primary: tw`px-3 py-2 rounded-md text-white bg-primary transition duration-150 hover:bg-primary-hover `,
  secondary: tw`px-3 py-2 rounded-md text-white bg-secondary transition duration-150 hover:bg-secondary-hover `,
};

const disabledMapping: {
  [key in ButtonColor]: TwStyle;
} = {
  primary: tw`bg-primary-dark text-gray-300 hover:bg-primary-dark`,
  secondary: tw`bg-secondary-dark text-gray-300 hover:bg-secondary-dark`,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, color = "primary", ...rest }, ref) => {
    return (
      <button
        {...rest}
        css={[colorMapping[color], rest.disabled && disabledMapping[color]]}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
