/** @jsxImportSource @emotion/react */
import "twin.macro";

import {
  Button,
  FormGroup,
  Input,
  Link,
  Form,
  FormRow,
  FormLabel,
} from "components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql } from "@apollo/client";
import { Trans, useTranslation } from "react-i18next";
import routePrefixes from "utils/routing-prefix";
import i18next from "i18next";
import mapViolationsToForm from "utils/mapViolationsToForm";
import {
  LeftPane,
  SectionSubTitle,
  SectionTitle,
  SubmitAdditionalLinkWrapper,
} from "security/components";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useRegisterUserMutation } from "generated/graphql";

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
  repeatPassword: string;
};

const RegisterPage = () => {
  const form = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

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
      history.push(`${routePrefixes.security}/login`);
    },
  });

  return (
    <LeftPane
      variants={animationVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <SectionTitle>{t("security.register_page.page_title")}</SectionTitle>
      <SectionSubTitle>
        {t("security.register_page.page_subtitle")}
      </SectionSubTitle>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(
            async ({ repeatPassword: _, ...data }) => {
              await register({
                variables: data,
              });
            }
          )}
        >
          <FormRow>
            <FormGroup>
              <FormLabel>
                {t("security.register_page.form.label_firstName")}
              </FormLabel>
              <Input type="text" {...form.register("firstName")} />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                {t("security.register_page.form.label_lastName")}
              </FormLabel>
              <Input type="text" {...form.register("lastName")} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>
                {t("security.register_page.form.label_email")}
              </FormLabel>
              <Input type="email" {...form.register("email")} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>
                {t("security.register_page.form.label_password")}
              </FormLabel>
              <Input type="password" {...form.register("password")} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>
                {t("security.register_page.form.label_repeatPassword")}
              </FormLabel>
              <Input type="password" {...form.register("repeatPassword")} />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Button
                block
                data-testid="btn-register"
                type="submit"
                color="secondary"
                disabled={form.formState.isSubmitting}
              >
                {t("security.register_page.form.btn_register")}
              </Button>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <SubmitAdditionalLinkWrapper>
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
              </SubmitAdditionalLinkWrapper>
            </FormGroup>
          </FormRow>
        </Form>
      </FormProvider>
    </LeftPane>
  );
};

export default RegisterPage;
