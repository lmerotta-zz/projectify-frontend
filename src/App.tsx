import { captureException } from "@sentry/minimal";
import { lazy, useEffect } from "react";
import { Route, Switch } from "react-router";
import AuthManager from "utils/AuthManager";
import prefixes from "utils/routing-prefix";

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      try {
        await AuthManager.isLoggedIn();
        console.log("Authenticated");
        // TODO: set authenticated to true
      } catch (e) {
        captureException(e);
        console.error("Not authenticated");
        // TODO: set authenticated to false
      }
    }, 1000);
  }, []);

  return (
    <Switch>
      <Route
        path={prefixes.security}
        component={lazy(/* istanbul ignore next */ () => import("security"))}
      />
    </Switch>
  );
};

export default App;
