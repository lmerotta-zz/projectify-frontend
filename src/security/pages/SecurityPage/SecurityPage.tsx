import { LinearProgress, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import { RightPane } from "security/components";
import * as Styles from "./SecurityPage.styles";

const LoginPage = lazy(() => import("security/pages/LoginPage/LoginPage"));
const RegisterPage = lazy(
  () => import("security/pages/RegisterPage/RegisterPage")
);

const SecurityPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Styles.Wrapper container spacing={0}>
      <Styles.Hero
        item
        xs={12}
        md={7}
        lg={8}
        container
        direction="column"
        justifyContent="center"
      >
        <Styles.Title variant="h3" component="h2" color="white">
          ProjectifyTmp
        </Styles.Title>
        <Styles.HeroContent>
          <Styles.SubTitle color="white" component="h4">
            <Trans
              i18nKey="security.login_page.hero.subtitle"
              components={{
                highlight: (
                  <Typography
                    color="secondary"
                    component="span"
                    variant="inherit"
                  />
                ),
              }}
            />
          </Styles.SubTitle>
          <Styles.Caption color="white">
            {t("security.login_page.hero.caption")}
          </Styles.Caption>
        </Styles.HeroContent>
      </Styles.Hero>

      <Suspense
        fallback={
          <RightPane>
            <LinearProgress variant="indeterminate" />
          </RightPane>
        }
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Styles.Wrapper>
  );
};

export default SecurityPage;
