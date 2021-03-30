import { ApolloError } from "@apollo/client";
import { ErrorOption, FieldName, FieldValues } from "react-hook-form";
import * as Sentry from "@sentry/react";

type ViolationsType<T extends FieldValues = FieldValues> = Array<{
  path: FieldName<T>;
  message: string;
}>;

function mapViolationsToForm<TFieldValues extends FieldValues = FieldValues>(
  setError: (name: keyof TFieldValues, error: ErrorOption) => void,
  e: ApolloError
) {
  if (
    e.graphQLErrors.length === 1 &&
    e.graphQLErrors[0].extensions?.violations?.length > 0
  ) {
    (e.graphQLErrors[0].extensions
      ?.violations as ViolationsType<TFieldValues>).forEach(
      ({ path, message }) => {
        setError(path, {
          type: "server",
          message,
        });
      }
    );

    return true;
  }

  Sentry.captureException(e);
  return false;
}

export default mapViolationsToForm;
