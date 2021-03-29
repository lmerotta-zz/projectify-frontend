/** @jsxImportSource @emotion/react */

import { Button, Input, Link, SubTitle, Title, ErrorMessage } from "components";
import { FormProvider, useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import background from "./images/background.svg";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { oauthBag } from "apollo/oauth";
import { motion } from "framer-motion";

const Wrapper = tw.div`flex flex-col lg:flex-row min-h-screen`;

const Hero = styled.div`
  ${tw`w-full px-8 py-16 flex flex-col items-center justify-center space-y-12 lg:w-2/3`}
  background-image: url(${background});
  background-size: cover;
`;

const HeroContent = tw.div`lg:self-start lg:w-2/3`;

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

export const AUTHORIZE_QUERY = gql`
  query authorize($challenge: String!) {
    authorize(response_type: "code", client_id: "${process.env.REACT_APP_OAUTH_CLIENTID}", code_challenge: $challenge, code_challenge_method: "S256", redirect_uri: "${process.env.REACT_APP_OAUTH_REDIRECTURI}", scope: ["public.profile", "email"])
      @rest(type: "Authorize", endpoint: "authorize", path:"?{args}", method: "GET") {
        code
      }
  }
`;

const LoginPage = () => {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const [authorize] = useLazyQuery<{ code: string }>(AUTHORIZE_QUERY, {
    fetchPolicy: "no-cache",
    onCompleted: ({ code }) => {
      oauthBag({ ...oauthBag(), one_time_code: code });
      // TODO: redirect to a page that makes a graphql query just to see if it works !
    },
    onError: (e) => {
      console.log(e);
      form.setError("global", {
        type: "server",
        message: "An error occured, please try again later",
      });
    },
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onError: (e) => {
      form.setError("global", {
        type: "server",
        message: (e.networkError as any)!.result!.error,
      });
    },
    onCompleted: async () => {
      await authorize({ variables: { challenge: oauthBag().challenge } });
    },
  });

  return (
    <Wrapper>
      <Hero>
        <Title tw="text-light lg:my-auto">ProjectifyTmp</Title>
        <HeroContent>
          <SubTitle tw="text-white font-normal mb-3 lg:text-6xl">
            Your <span tw="text-secondary font-medium">projects</span>, your
            way.
          </SubTitle>
          <p tw="text-white font-light text-sm lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            quis nunc a mauris faucibus aliquet. Nullam sed{" "}
          </p>
        </HeroContent>
      </Hero>
      <div tw="w-full flex-1 bg-white flex flex-col px-8 py-10 lg:w-1/3 md:px-48 lg:px-16 md:justify-center">
        <Title>Login</Title>
        <SubTitle tw="mb-10 lg:mb-20">Log in to access your projects.</SubTitle>
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
                label="Email"
                ref={form.register}
              />
            </div>
            <div tw="mb-8 lg:mb-2">
              <Input
                name="password"
                type="password"
                label="Password"
                ref={form.register}
              />
            </div>
            <Link href="/pek" tw="font-light text-sm mb-10 lg:text-xs">
              Forgot password?
            </Link>

            <motion.div tw="flex justify-center mb-3" layout>
              <ErrorMessage name="global" />
            </motion.div>

            <div tw="flex justify-evenly items-center flex-col">
              <Button
                data-testid="btn-login"
                type="submit"
                tw="w-full mb-5 flex-1 py-4 font-bold"
              >
                Log In
              </Button>

              <span tw="text-sm text-default">
                Don't have an account ?{" "}
                <Link href="/pek" color="secondary">
                  Register here
                </Link>
              </span>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
