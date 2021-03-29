/** @jsxImportSource @emotion/react */

import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { SubTitle, Title } from "components";
import * as Styles from "./index.styles";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";

const SecurityPage = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  return (
    <Styles.Wrapper>
      <Styles.Hero>
        <Title tw="text-light lg:my-auto">ProjectifyTmp</Title>
        <Styles.HeroContent>
          <SubTitle tw="text-white font-normal mb-3 lg:text-6xl">
            <Trans
              i18nKey="security.login_page.hero.subtitle"
              components={{
                highlight: <span tw="text-secondary font-medium" />,
              }}
            />
          </SubTitle>
          <p tw="text-white font-light text-sm lg:text-xl">
            {t("security.login_page.hero.caption")}
          </p>
        </Styles.HeroContent>
      </Styles.Hero>

      <div tw="w-full flex-1 bg-white flex flex-col px-8 py-10 lg:w-1/3 md:px-48 lg:px-16 md:justify-center">
        <Switch>
          <Route
            path={`${path}/login`}
            component={lazy(() => import("security/LoginPage/LoginPage"))}
          />
          <Route
            path={`${path}/register`}
            component={lazy(() => import("security/RegisterPage/RegisterPage"))}
          />
        </Switch>
      </div>
    </Styles.Wrapper>
  );
};

export default SecurityPage;
