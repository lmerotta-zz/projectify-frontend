import tw, { styled } from "twin.macro";

const ModalFooter = styled.div<{ leftAlign?: boolean }>`
  ${tw`p-4 border-t-2 border-gray-200 flex`}
  ${({ leftAlign }) => (leftAlign ? "" : tw`justify-end`)}
`;

export default ModalFooter;
