import { Link } from "components";
import tw, { styled } from "twin.macro";

export const ForgotPasswordLink = styled(Link)`
  ${tw`font-light text-sm lg:text-xs`}
`;

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

export const GithubLink = styled.a`
  ${tw`px-3 py-2 border border-gray-400 text-gray-600 transition duration-300 bg-white rounded-md inline-flex items-center hover:bg-gray-100 active:bg-gray-300`}

  & > img {
    ${tw`object-contain h-8 mr-2`}
  }
`;
