/** @jsxImportSource @emotion/react */
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import * as Styles from "./index.styles";
import { Trans, useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

const SecurityPage = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Styles.Wrapper>
      <Styles.Hero>
        <Styles.Title variant="h2" as="h1" color="light" weight="bold">
          ProjectifyTmp
        </Styles.Title>
        <Styles.HeroContent>
          <Styles.SubTitle variant="h5" as="h2" color="white">
            <Trans
              i18nKey="security.login_page.hero.subtitle"
              components={{
                highlight: (
                  <Styles.SubTitleHighLight
                    color="secondary"
                    weight="medium"
                    variant="h5"
                    as="span"
                  />
                ),
              }}
            />
          </Styles.SubTitle>
          <Styles.Caption variant="sm" color="white" weight="light">
            {t("security.login_page.hero.caption")}
          </Styles.Caption>
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
          </Switch>
        </AnimatePresence>
      </Suspense>
    </Styles.Wrapper>
  );
};

export default SecurityPage;
