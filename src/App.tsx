import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { PrivateRoute } from "components";
import AppContainer from "modules/core/components/AppContainer";
import { pluginStore } from "modules/core/pluginStore";
import { SecurityPage } from "modules/security";
import { useEffect } from "react";
import { PluginProvider } from "react-pluggable";
import { Route, Routes } from "react-router-dom";
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
    <PluginProvider pluginStore={pluginStore}>
      <Routes>
        <Route
          path="/*"
          element={<PrivateRoute element={<AppContainer />} />}
        />
        <Route path="/security/*" element={<SecurityPage />} />
      </Routes>
    </PluginProvider>
  );
};

export default App;
