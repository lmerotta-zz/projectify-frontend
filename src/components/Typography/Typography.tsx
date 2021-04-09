/** @jsxImportSource @emotion/react */
import tw, { styled, TwStyle } from "twin.macro";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "sm" | "xs";

const variantMapping: { [key in Variant]: TwStyle } = {
  h1: tw`text-5xl`,
  h2: tw`text-4xl`,
  h3: tw`text-3xl`,
  h4: tw`text-2xl`,
  h5: tw`text-xl`,
  h6: tw`text-lg`,
  body: tw`text-base`,
  sm: tw`text-sm`,
  xs: tw`text-xs`,
};

type Color =
  | "white"
  | "default"
  | "dark"
  | "light"
  | "primary"
  | "secondary"
  | "danger";

const colorMapping: { [key in Color]: TwStyle } = {
  white: tw`text-white`,
  default: tw`text-default`,
  dark: tw`text-dark`,
  light: tw`text-light`,
  primary: tw`text-primary`,
  secondary: tw`text-secondary`,
  danger: tw`text-danger`,
};

type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";

const fontWeightMapping: { [key in FontWeight]: TwStyle } = {
  light: tw`font-light`,
  normal: tw`font-normal`,
  semibold: tw`font-semibold`,
  medium: tw`font-medium`,
  bold: tw`font-bold`,
};

type TypographyProps = {
  variant?: Variant;
  color?: Color;
  weight?: FontWeight;
};

const Typography = styled.p<TypographyProps>`
  ${({ variant = "body" }) => variantMapping[variant]}
  ${({ color = "default" }) => colorMapping[color]}
  ${({ weight = "normal" }) => fontWeightMapping[weight]}
`;

export default Typography;
