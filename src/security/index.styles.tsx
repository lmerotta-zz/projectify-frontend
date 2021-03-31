/** @jsxImportSource @emotion/react */

import tw, { styled } from "twin.macro";
import background from "./images/background.svg";

export const Wrapper = tw.div`flex flex-col lg:flex-row min-h-screen`;
export const Hero = styled.div`
  ${tw`w-full px-8 py-16 flex flex-col items-center justify-center space-y-12 lg:w-2/3`}
  background-image: url(${background});
  background-size: cover;
`;
export const HeroContent = tw.div`lg:self-start lg:w-2/3`;
