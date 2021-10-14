import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "apollo/local-state";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const authenticated = useReactiveVar(isAuthenticated);
  const location = useLocation();

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    element
  ) : (
    <Navigate to="/security/login" replace state={{ referrer: location }} />
  );
};

export default PrivateRoute;
