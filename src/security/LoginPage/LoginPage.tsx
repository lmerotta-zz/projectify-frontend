/** @jsxImportSource @emotion/react */

import { Input, SubTitle, Title } from "components";
import { FormProvider, useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import background from "./images/background.svg";

const Wrapper = tw.div`flex flex-col lg:flex-row min-h-screen`;

const Hero = styled.div`
  ${tw`w-full px-8 py-16 flex flex-col items-center justify-center space-y-12 lg:w-2/3`}
  background-image: url(${background});
  background-size: cover;
`;

const HeroContent = tw.div`lg:self-start lg:w-2/3`;

const LoginPage = () => {
  const form = useForm();

  return (
    <Wrapper>
      <Hero>
        <Title tw="text-light lg:my-auto">ProjectifyTmp</Title>
        <HeroContent>
          <SubTitle tw="text-white font-normal mb-3 lg:text-6xl">
            Your <span tw="text-secondary font-medium">projects</span>, your
            way.
          </SubTitle>
          <p tw="text-white font-light text-sm lg:text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            quis nunc a mauris faucibus aliquet. Nullam sed{" "}
          </p>
        </HeroContent>
      </Hero>
      <div tw="w-full bg-white flex flex-col px-8 py-16 lg:w-1/3 lg:px-16 lg:justify-center">
        <Title>Login</Title>
        <SubTitle tw="mb-10 lg:mb-20">Log in to access your projects.</SubTitle>
        <FormProvider {...form}>
          <div tw="mb-5 lg:mb-8">
            <Input name="email" type="email" label="Email" />
          </div>
          <div tw="mb-8 lg:mb-2">
            <Input name="password" type="password" label="Password" />
          </div>
          <a href="/pek" tw="text-dark font-light text-sm mb-10 lg:text-xs">
            Forgot password?
          </a>

          <div tw="flex justify-evenly items-center flex-col">
            <button
              type="submit"
              tw="text-white w-full mb-5 flex-1 bg-primary px-6 py-4 rounded-md font-bold transition hover:bg-primary-hover"
            >
              Log In
            </button>

            <span tw="text-sm text-default">
              Don't have an account ?{" "}
              <a
                href="/pek"
                tw="text-secondary transition hover:text-secondary-hover"
              >
                Register here
              </a>
            </span>
          </div>
        </FormProvider>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
