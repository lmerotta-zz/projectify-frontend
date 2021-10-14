import { ApolloError } from "@apollo/client";
import * as Sentry from "@sentry/react";
import i18next from "i18next";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

type ViolationsType<T extends FieldValues = FieldValues> = Array<{
  path: Path<T>;
  message: string;
}>;

function mapViolationsToForm<TFieldValues extends FieldValues = FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  e: ApolloError
) {
  if (
    e.graphQLErrors.length === 1 &&
    e.graphQLErrors[0].extensions?.violations?.length > 0
  ) {
    (
      e.graphQLErrors[0].extensions!.violations as ViolationsType<TFieldValues>
    ).forEach(({ path, message }) => {
      setError(path, {
        type: "server",
        message,
      });
    });

    return true;
  }

  Sentry.captureException(e);
  toast.error(i18next.t("global.errors.internal-server-error"));
  return false;
}

export default mapViolationsToForm;
