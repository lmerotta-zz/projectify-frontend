import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { lazy, Suspense } from "react";
import { Switch, useRouteMatch } from "react-router-dom";

const UserManagement = () => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={null}>
      <Switch>
        <PrivateRoute
          path={`${path}/onboarding`}
          component={lazy(
            /* istanbul ignore next */ () =>
              import("user-management/OnboardingPage/OnboardingPage")
          )}
        />
      </Switch>
    </Suspense>
  );
};

export default UserManagement;
