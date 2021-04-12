import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

export const Backdrop = motion(
  tw.div`fixed w-full h-full bg-primary p-4 flex justify-center items-center top-0 left-0 bottom-0 right-0 z-index[1050]`
);

export const Wrapper = motion(
  styled.div`
    ${tw`rounded-md bg-white shadow-2xl w-full h-auto relative z-10 md:w-4/5 lg:w-2/4 xl:w-2/5`}
  `
);
