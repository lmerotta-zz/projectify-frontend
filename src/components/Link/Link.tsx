/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
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

const Link: FC<NavLinkProps & LinkProps> = ({
  children,
  color = "dark",
  ...rest
}) => {
  return (
    <NavLink {...rest} css={colorMapping[color]}>
      {children}
    </NavLink>
  );
};

export default Link;
