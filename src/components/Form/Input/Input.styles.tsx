import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

export const Wrapper = motion(
  tw.div`outline-none w-full flex flex-col items-stretch`
);

export const InputWrapper = motion(tw.div`w-full relative`);
export const Input = styled.input<{ invalid?: boolean }>`
  ${tw`w-full p-2 text-base border border-gray-400 bg-white appearance-none outline-none transition-colors focus:border-primary`}

  ${({ invalid }) => invalid && tw`border-danger!`}
`;
