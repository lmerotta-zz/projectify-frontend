import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { lazy, useEffect } from "react";
import { Route, Switch } from "react-router";
import AuthManager from "utils/AuthManager";
import prefixes from "utils/routing-prefix";

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      try {
        await AuthManager.isLoggedIn();
        isAuthenticated(true);
      } catch (e) {
        captureException(e);
        isAuthenticated(false);
      }
    }, 1000);
  }, []);

  return (
    <Switch>
      <Route
        path={prefixes.security}
        component={lazy(/* istanbul ignore next */ () => import("security"))}
      />
      <Route
        path={prefixes.userManagement}
        component={lazy(
          /* istanbul ignore next */ () => import("user-management")
        )}
      />
    </Switch>
  );
};

export default App;
