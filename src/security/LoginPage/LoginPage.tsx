/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Button, Input, Link, FormGroup } from "components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { Trans, useTranslation } from "react-i18next";
import routePrefixes from "utils/routing-prefix";
import {
  LeftPane,
  SectionSubTitle,
  SectionTitle,
  SubmitFormContainer,
  SubmitAdditionalLinkWrapper,
} from "security/components";
import mapViolationsToForm from "utils/mapViolationsToForm";
import AuthManager from "utils/AuthManager";
import { useLocation } from "react-router";
import * as Styles from "./LoginPage.styles";
import ghLogo from "./images/gh-logo.png";
import { toast } from "react-toastify";
import { login, loginVariables } from "apollo/types/login";

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

  const [login] = useMutation<login, loginVariables>(LOGIN_MUTATION, {
    onError: (e) => {
      /* istanbul ignore else */
      if (!mapViolationsToForm(form.setError, e)) {
        toast.error((e.networkError as any)!.result!.error);
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
      <SectionTitle>{t("security.login_page.page_title")}</SectionTitle>
      <SectionSubTitle>
        {t("security.login_page.page_subtitle")}
      </SectionSubTitle>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            await login({
              variables: { username: data.email, password: data.password },
            });
          })}
        >
          <FormGroup>
            <Input
              name="email"
              type="email"
              label={t("security.login_page.form.label_email")}
              ref={form.register}
            />
          </FormGroup>
          <FormGroup last>
            <Input
              name="password"
              type="password"
              label={t("security.login_page.form.label_password")}
              ref={form.register}
            />
          </FormGroup>
          <Styles.ForgotPasswordLink to="/pek">
            {t("security.login_page.form.forgot_password_link")}
          </Styles.ForgotPasswordLink>

          <SubmitFormContainer>
            <Button
              data-testid="btn-login"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {t("security.login_page.form.btn_login")}
            </Button>

            <SubmitAdditionalLinkWrapper>
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
            </SubmitAdditionalLinkWrapper>
          </SubmitFormContainer>
        </form>
      </FormProvider>
      <div>
        <Styles.Divider>
          {t("security.login_page.form.label_or")}
        </Styles.Divider>
        <Styles.GithubLink
          href={`${process.env.REACT_APP_ACTIONS_URL}/oauth/connect/github?_destination=${process.env.REACT_APP_ACTIONS_URL}/oauth/connected?target=${referrer}`}
        >
          <img src={ghLogo} alt="GitHub Logo" />
          {t("security.login_page.form.oauth_github_login")}
        </Styles.GithubLink>
      </div>
    </LeftPane>
  );
};

export default LoginPage;
