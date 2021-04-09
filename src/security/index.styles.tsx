/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro";
import { Typography } from "components";
import background from "./images/background.svg";

export const Wrapper = tw.div`flex flex-col lg:flex-row min-h-screen`;
export const Hero = styled.div`
  ${tw`w-full px-8 py-16 flex flex-col items-center justify-center space-y-12 lg:w-3/5 xl:w-2/3`}
  background-image: url(${background});
  background-size: cover;
`;

export const Title = tw(Typography)`
  lg:my-auto md:text-5xl
`;

export const SubTitle = tw(Typography)`mb-3 md:text-2xl lg:text-6xl`;
export const SubTitleHighLight = tw(
  Typography.withComponent("span")
)`md:text-2xl lg:text-6xl`;
export const Caption = tw(Typography)`lg:text-xl`;

export const HeroContent = tw.div`lg:self-start lg:w-2/3`;
