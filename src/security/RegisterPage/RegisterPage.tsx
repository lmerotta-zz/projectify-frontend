/** @jsxImportSource @emotion/react */
import "twin.macro";

import { Button, Input, Link, SubTitle, Title, ErrorMessage } from "components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import routePrefixes from "utils/routing-prefix";
import i18next from "i18next";
import mapViolationsToForm from "utils/mapViolationsToForm";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  repeatPassword: yup
    .string()
    .required()
    .test({
      name: "equalTo",
      exclusive: false,
      message: i18next.t(
        "security.register_page.form.errors.password_mismatch"
      ),
      test: (value, context) => value === context.parent.password,
    }),
});

export const REGISTER_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      clientMutationId
    }
  }
`;

type RegisterFormType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  global?: unknown;
};

const RegisterPage = () => {
  const form = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const [register] = useMutation(REGISTER_MUTATION, {
    onError: (e) => {
      if (!mapViolationsToForm(form.setError, e)) {
        form.setError("global", {
          type: "server",
          message: "Oops...",
        });
      }
    },
    // todo: onCompleted
  });

  return (
    <>
      <Title>{t("security.register_page.page_title")}</Title>
      <SubTitle tw="mb-10 lg:mb-20">
        {t("security.register_page.page_subtitle")}
      </SubTitle>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            await register({
              variables: data,
            });
          })}
        >
          <div tw="mb-5 lg:mb-8">
            <Input
              name="firstName"
              type="text"
              label={t("security.register_page.form.label_firstName")}
              ref={form.register}
            />
          </div>
          <div tw="mb-5 lg:mb-8">
            <Input
              name="lastName"
              type="text"
              label={t("security.register_page.form.label_lastName")}
              ref={form.register}
            />
          </div>
          <div tw="mb-5 lg:mb-8">
            <Input
              name="email"
              type="email"
              label={t("security.register_page.form.label_email")}
              ref={form.register}
            />
          </div>
          <div tw="mb-8 lg:mb-8">
            <Input
              name="password"
              type="password"
              label={t("security.register_page.form.label_password")}
              ref={form.register}
            />
          </div>
          <div tw="mb-8 lg:mb-2">
            <Input
              name="repeatPassword"
              type="password"
              label={t("security.register_page.form.label_repeatPasword")}
              ref={form.register}
            />
          </div>

          <motion.div tw="flex justify-center mb-3" layout>
            <ErrorMessage name="global" />
          </motion.div>

          <div tw="flex justify-evenly items-center flex-col">
            <Button
              data-testid="btn-login"
              type="submit"
              tw="w-full mb-5 flex-1 py-4 font-bold"
            >
              {t("security.register_page.form.btn_login")}
            </Button>

            <span tw="text-sm text-default">
              <Trans
                i18nKey="security.register_page.form.existing_account_link"
                components={{
                  Link: (
                    <Link
                      to={`${routePrefixes.security}/login`}
                      color="secondary"
                    />
                  ),
                }}
              />
            </span>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterPage;
