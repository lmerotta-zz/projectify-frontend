import { gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Link, Typography } from "@mui/material";
import { TextField } from "components";
import { useRegisterUserMutation } from "generated/graphql";
import i18next from "i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RightPane, RightPaneFormWrapper } from "security/components";
import mapViolationsToForm from "utils/mapViolationsToForm";
import * as yup from "yup";

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
  repeatPassword: string;
};

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

const RegisterPage = () => {
  const form = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [register] = useRegisterUserMutation({
    onError: (e) => {
      console.log(e);
      /* istanbul ignore else */
      if (!mapViolationsToForm(form.setError, e)) {
        toast.error(t("global.errors.internal-server-error"));
      }
    },
    onCompleted: () => {
      toast.success(t("security.register_page.message.user_created"));
      navigate("../login");
    },
  });

  return (
    <RightPane>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "medium" }}>
        {t("security.register_page.page_title")}
      </Typography>
      <Typography
        variant="subtitle1"
        component="h3"
        color="neutral"
        sx={{ fontWeight: "medium" }}
      >
        {t("security.register_page.page_subtitle")}
      </Typography>
      <FormProvider {...form}>
        <RightPaneFormWrapper
          component="form"
          onSubmit={form.handleSubmit(
            async ({ repeatPassword: _, ...data }) => {
              await register({
                variables: data,
              });
            }
          )}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="firstName"
                label={t("security.register_page.form.label_firstName")}
                fullWidth
                variant="standard"
                {...form.register("firstName")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastName"
                label={t("security.register_page.form.label_lastName")}
                fullWidth
                variant="standard"
                {...form.register("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                label={t("security.register_page.form.label_email")}
                fullWidth
                variant="standard"
                {...form.register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                label={t("security.register_page.form.label_password")}
                fullWidth
                variant="standard"
                {...form.register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="repeatPassword"
                type="password"
                label={t("security.register_page.form.label_repeatPassword")}
                fullWidth
                variant="standard"
                {...form.register("repeatPassword")}
              />
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
                {t("security.register_page.form.btn_register")}
              </Button>
              <Typography mt={2} color="neutral" variant="body2">
                <Trans
                  i18nKey="security.register_page.form.existing_account_link"
                  components={{
                    Link: (
                      <Link
                        component={RouterLink}
                        to="../login"
                        color="secondary"
                        underline="hover"
                        variant="inherit"
                      />
                    ),
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </RightPaneFormWrapper>
      </FormProvider>
    </RightPane>
  );
};

export default RegisterPage;
