import * as Styles from "./ErrorMessage.styles";
import { ErrorMessage as FormErrorMessage } from "@hookform/error-message";

type ErrorMessageProps = {
  name: string;
};
const ErrorMessage = ({ name }: ErrorMessageProps) => (
  <FormErrorMessage
    name={name}
    render={({ message }) => (
      <Styles.Wrapper data-testid={`error-message-${name}`} layout>
        {message}
      </Styles.Wrapper>
    )}
  />
);

export default ErrorMessage;
