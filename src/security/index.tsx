/** @jsxImportSource @emotion/react */

import { lazy, Suspense } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { SubTitle, Title } from "components";
import * as Styles from "./index.styles";
import { Trans, useTranslation } from "react-i18next";
import "twin.macro";
import { AnimatePresence } from "framer-motion";

const SecurityPage = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  const location = useLocation();

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

      <Suspense fallback="test">
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route
              path={`${path}/login`}
              component={lazy(
                /* istanbul ignore next */ () =>
                  import("security/LoginPage/LoginPage")
              )}
            />
            <Route
              path={`${path}/register`}
              component={lazy(
                /* istanbul ignore next */ () =>
                  import("security/RegisterPage/RegisterPage")
              )}
            />
            <Route
              path={`${path}/grant-access`}
              component={lazy(
                /* istanbul ignore next */ () =>
                  import("security/LoginCallback/LoginCallback")
              )}
            />
          </Switch>
        </AnimatePresence>
      </Suspense>
    </Styles.Wrapper>
  );
};

export default SecurityPage;
