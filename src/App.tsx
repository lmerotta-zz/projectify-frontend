import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { PrivateRoute } from "components";
import AppContainer from "modules/core/components/AppContainer";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthManager from "utils/AuthManager";

const SecurityPage = lazy(
  /* istanbul ignore next */ () =>
    import("modules/security").then((module) => ({
      default: module.SecurityPage,
    }))
);

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
    <Routes>
      <Route path="/*" element={<PrivateRoute element={<AppContainer />} />} />
      <Route path="/security/*" element={<SecurityPage />} />
    </Routes>
  );
};

export default App;
