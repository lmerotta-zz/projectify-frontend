import tw, { styled } from "twin.macro";
const SubmitFormContainer = styled.div`
  ${tw`flex justify-evenly items-center flex-col items-stretch mt-3`}

  & > *:first-child {
    ${tw`mb-5 flex-1 py-4 font-bold`}
  }
`;

export default SubmitFormContainer;
