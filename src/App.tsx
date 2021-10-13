import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { lazy, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AuthManager from "utils/AuthManager";

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
    <Switch>
      <Route
        path="/security"
        component={lazy(
          /* istanbul ignore next */ () =>
            import("security").then((module) => ({
              default: module.SecurityPage,
            }))
        )}
      />
    </Switch>
  );
};

export default App;
