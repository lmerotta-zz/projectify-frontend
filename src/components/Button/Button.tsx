/** @jsxImportSource @emotion/react */
import { ComponentProps, forwardRef } from "react";
import tw, { TwStyle } from "twin.macro";

type ButtonColor = "primary";

type ButtonProps = ComponentProps<"button"> & {
  color?: ButtonColor;
};

const colorMapping: {
  [key in ButtonColor]: TwStyle;
} = {
  primary: tw`px-3 py-2 rounded-md text-white bg-primary transition hover:bg-primary-hover`,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, color = "primary", ...rest }, ref) => {
    return (
      <button {...rest} css={colorMapping[color]} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;
