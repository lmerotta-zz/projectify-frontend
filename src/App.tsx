import { lazy } from "react";
import { Route, Switch } from "react-router";
import prefixes from "utils/routing-prefix";

const App = () => (
  <Switch>
    <Route
      path={prefixes.security}
      component={lazy(() => import("security"))}
    />
  </Switch>
);

export default App;
