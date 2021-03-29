import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

const SecurityPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        path={`${path}/login`}
        component={lazy(() => import("security/LoginPage/LoginPage"))}
      />
    </Switch>
  );
};

export default SecurityPage;
