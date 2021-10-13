import { gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { GitHub } from "@mui/icons-material";
import { Button, Divider, Grid, Link, Typography } from "@mui/material";
import { TextField } from "components";
import { useLoginMutation } from "generated/graphql";
import { FormProvider, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RightPane, RightPaneFormWrapper } from "security/components";
import AuthManager from "utils/AuthManager";
import mapViolationsToForm from "utils/mapViolationsToForm";
import * as yup from "yup";

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

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const form = useForm<LoginFormType>({
    resolver: yupResolver(schema),
  });
  const { state } = useLocation<{ referrer: Location }>();

  const referrer = state?.referrer
    ? `${state.referrer.pathname}${state.referrer.search}${state.referrer.hash}`
    : "/";

  const { t } = useTranslation();

  const [login] = useLoginMutation({
    onError: (e) => {
      /* istanbul ignore else */
      if (!mapViolationsToForm(form.setError, e)) {
        toast.error(t("global.errors.internal-server-error"));
      }
    },
    onCompleted: async () => {
      await AuthManager.login({ state: referrer });
    },
  });

  return (
    <RightPane>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "medium" }}>
        {t("security.login_page.page_title")}
      </Typography>
      <Typography
        variant="subtitle1"
        component="h3"
        color="neutral"
        sx={{ fontWeight: "medium" }}
      >
        {t("security.login_page.page_subtitle")}
      </Typography>
      <FormProvider {...form}>
        <RightPaneFormWrapper
          component="form"
          onSubmit={form.handleSubmit(async (data) => {
            await login({
              variables: { username: data.email, password: data.password },
            });
          })}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                label={t("security.login_page.form.label_email")}
                fullWidth
                variant="standard"
                {...form.register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                label={t("security.login_page.form.label_password")}
                fullWidth
                variant="standard"
                {...form.register("password")}
              />
              <Link
                display="block"
                component={RouterLink}
                mt={2}
                to="/pek"
                underline="hover"
                variant="body2"
                color="neutral"
              >
                {t("security.login_page.form.forgot_password_link")}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                size="large"
                disabled={form.formState.isSubmitting}
              >
                {t("security.login_page.form.btn_login")}
              </Button>
              <Typography mt={2} color="neutral" variant="body2">
                <Trans
                  i18nKey="security.login_page.form.register_link"
                  components={{
                    Link: (
                      <Link
                        component={RouterLink}
                        to="/security/register"
                        color="secondary"
                        underline="hover"
                        variant="inherit"
                      />
                    ),
                  }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography color="neutral">
                  {t("security.login_page.form.label_or")}
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={Link}
                variant="outlined"
                color="inherit"
                href={`${process.env.REACT_APP_ACTIONS_URL}/oauth/connect/github?_destination=${process.env.REACT_APP_ACTIONS_URL}/oauth/connected?target=${referrer}`}
                size="large"
                startIcon={<GitHub />}
              >
                {t("security.login_page.form.oauth_github_login")}
              </Button>
            </Grid>
          </Grid>
        </RightPaneFormWrapper>
      </FormProvider>
    </RightPane>
  );
};

export default LoginPage;
