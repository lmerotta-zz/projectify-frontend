/** @jsxImportSource @emotion/react */
import { FC, HTMLProps } from "react";
import tw, { TwStyle } from "twin.macro";

type TextColor = "dark" | "secondary";

type LinkProps = {
  color?: TextColor;
};

const colorMapping: {
  [key in TextColor]: TwStyle;
} = {
  dark: tw`text-dark hover:text-default transition`,
  secondary: tw`text-secondary transition hover:text-secondary-hover`,
};

const Link: FC<
  Omit<HTMLProps<HTMLAnchorElement>, "as" | "color"> & LinkProps
> = ({ children, color = "dark", ...rest }) => {
  return (
    <a {...rest} css={colorMapping[color]}>
      {children}
    </a>
  );
};

export default Link;
