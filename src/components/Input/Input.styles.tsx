import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

export const Wrapper = motion(tw.div`relative outline-none`);

export const labelFilledStyles = tw`text-primary top-0 translate-y-0.5 text-xs`;

export const Label = styled.label`
  ${tw`absolute top-1/2 transform -translate-y-1/2 left-3 text-default cursor-text transition-all pointer-events-none`}
`;

export const InputWrapper = motion(tw.div`w-full relative`);
export const Input = styled.input<{ invalid?: boolean }>`
  ${tw`w-full pt-4 pb-2 pl-3 pr-3 border rounded border-gray-400 appearance-none outline-none transition-colors focus:border-primary`}
  &:focus {
    + .label {
      ${labelFilledStyles}
    }
  }

  :not(:placeholder-shown) {
    ${tw`border-primary`}
    + .label {
      ${labelFilledStyles}
    }
  }

  ${({ invalid }) => invalid && tw`border-red-600!`}
  + .label {
    ${({ invalid }) => invalid && tw`text-red-600!`}
  }
`;
