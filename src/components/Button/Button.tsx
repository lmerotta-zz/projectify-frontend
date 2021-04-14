/** @jsxImportSource @emotion/react */
import { ComponentProps } from "react";
import tw, { styled } from "twin.macro";

type ButtonColor = "primary" | "secondary";

type ButtonProps = ComponentProps<"button"> & {
  color?: ButtonColor;
  block?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${tw`px-3 py-3 text-white transition duration-150`}
  ${({ color = "primary" }) =>
    color === "primary"
      ? tw`bg-primary hover:bg-primary-hover`
      : tw`bg-secondary hover:bg-secondary-hover`}

  ${({ block }) => block && tw`w-full`}

  ${({ disabled }) => disabled && tw`text-gray-300`}
  ${({ disabled, color = "primary" }) => {
    if (disabled) {
      switch (color) {
        case "primary":
          return tw`bg-primary-dark hover:bg-primary-dark`;
        case "secondary":
          return tw`bg-secondary-dark hover:bg-secondary-dark`;
      }
    }
  }}
`;

export default Button;
