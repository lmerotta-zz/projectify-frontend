import tw from "twin.macro";
import { motion } from "framer-motion";
import { ErrorMessage as FormErrorMessage } from "@hookform/error-message";

const Wrapper = motion.custom(tw.span`text-red-600 text-sm`);

type ErrorMessageProps = {
  name: string;
};
const ErrorMessage = ({ name }: ErrorMessageProps) => (
  <FormErrorMessage
    name={name}
    render={({ message }) => <Wrapper layout>{message}</Wrapper>}
  />
);

export default ErrorMessage;
