import tw, { styled } from "twin.macro";

type FormGroupProps = {
  last?: boolean;
};

const FormGroup = styled.div<FormGroupProps>`
  ${tw`mb-5 lg:mb-8`}
  ${({ last }) => (last ? tw`mb-8 lg:mb-2` : "")}
`;

export default FormGroup;
