import tw, { styled } from "twin.macro";

export const Divider = styled.p`
  &:before,
  &:after {
    content: " ";
    height: 1px;
    ${tw`bg-gray-300 absolute top-1/2 -translate-y-1/2`}
  }

  &:before {
    ${tw`left-0 w-2/5`}
  }
  &:after {
    ${tw`right-0 w-2/5`}
  }

  ${tw`bg-white text-center relative my-5 text-default`}
`;
