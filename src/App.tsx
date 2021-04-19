import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { lazy, useEffect } from "react";
import { Route, Switch } from "react-router";
import OnboardingProcess from "user-management/components/onboarding/OnboardingProcess";
import AuthManager from "utils/AuthManager";
import prefixes from "utils/routing-prefix";

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      try {
        await AuthManager.isLoggedIn();
        isAuthenticated(true);
      } catch (e) {
        await AuthManager.logout();
        captureException(e);
        isAuthenticated(false);
      }
    }, 0);
  }, []);

  return (
    <>
      <Switch>
        <Route
          path={prefixes.security}
          component={lazy(/* istanbul ignore next */ () => import("security"))}
        />
      </Switch>
      <OnboardingProcess />
    </>
  );
};

export default App;
