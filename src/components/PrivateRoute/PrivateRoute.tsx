import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "apollo/local-state";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

const PrivateRoute = (props: RouteProps) => {
  const authenticated = useReactiveVar(isAuthenticated);
  const location = useLocation();

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/security/login",
        state: { referrer: location },
      }}
    />
  );
};

export default PrivateRoute;
