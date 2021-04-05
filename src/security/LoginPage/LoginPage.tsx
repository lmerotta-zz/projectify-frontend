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
import LeftPane from "security/LeftPane";
import mapViolationsToForm from "utils/mapViolationsToForm";
import AuthManager from "utils/AuthManager";
import { useLocation } from "react-router";
import * as Styles from "./LoginPage.styles";
import ghLogo from "./images/gh-logo.png";

const animationVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password })
      @rest(
        type: "Login"
        path: ""
        endpoint: "login"
        method: "POST"
        bodyKey: "input"
      ) {
      NoResponse
    }
  }
`;

type LoginFormType = {
  email: string;
  password: string;
  global?: unknown;
};

const LoginPage = () => {
  const form = useForm<LoginFormType>({
    resolver: yupResolver(schema),
  });
  const { state } = useLocation<{ referrer: Location }>();
  /* istanbul ignore next */
  const referrer = state?.referrer
    ? `${state.referrer.pathname}${state.referrer.search}${state.referrer.hash}`
    : "/";

  const { t } = useTranslation();

  const [login] = useMutation(LOGIN_MUTATION, {
    onError: (e) => {
      /* istanbul ignore else */
      if (!mapViolationsToForm(form.setError, e)) {
        form.setError("global", {
          type: "server",
          message: (e.networkError as any)!.result!.error,
        });
      }
    },
    onCompleted: async () => {
      await AuthManager.login({ state: referrer });
    },
  });

  return (
    <LeftPane
      variants={animationVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <Title>{t("security.login_page.page_title")}</Title>
      <SubTitle tw="mb-10 lg:mb-20">
        {t("security.login_page.page_subtitle")}
      </SubTitle>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            await login({
              variables: { username: data.email, password: data.password },
            });
          })}
        >
          <div tw="mb-5 lg:mb-8">
            <Input
              name="email"
              type="email"
              label={t("security.login_page.form.label_email")}
              ref={form.register}
            />
          </div>
          <div tw="mb-8 lg:mb-2">
            <Input
              name="password"
              type="password"
              label={t("security.login_page.form.label_password")}
              ref={form.register}
            />
          </div>
          <Link to="/pek" tw="font-light text-sm mb-10 lg:text-xs">
            {t("security.login_page.form.forgot_password_link")}
          </Link>

          <motion.div tw="flex justify-center mb-3" layout>
            <ErrorMessage name="global" />
          </motion.div>

          <div tw="flex justify-evenly items-center flex-col">
            <Button
              data-testid="btn-login"
              type="submit"
              disabled={form.formState.isSubmitting}
              tw="w-full mb-5 flex-1 py-4 font-bold"
            >
              {t("security.login_page.form.btn_login")}
            </Button>

            <span tw="text-sm text-default">
              <Trans
                i18nKey="security.login_page.form.register_link"
                components={{
                  Link: (
                    <Link
                      to={`${routePrefixes.security}/register`}
                      color="secondary"
                    />
                  ),
                }}
              />
            </span>
          </div>
        </form>
      </FormProvider>
      <div>
        <Styles.Divider>Or</Styles.Divider>
        <a
          tw="px-3 py-2 border border-gray-400 text-gray-600 transition duration-300 bg-white rounded-md inline-flex items-center hover:bg-gray-100"
          href={`${process.env.REACT_APP_ACTIONS_URL}/oauth/connect/github?_destination=${process.env.REACT_APP_ACTIONS_URL}/oauth/connected?target=${referrer}`}
        >
          <img tw="object-contain h-8 mr-2" src={ghLogo} alt="GitHub Logo" />
          Login with GitHub
        </a>
      </div>
    </LeftPane>
  );
};

export default LoginPage;
