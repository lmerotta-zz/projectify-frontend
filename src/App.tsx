import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { PrivateRoute } from "components";
import AppContainer from "modules/core/components/AppContainer";
import "modules/project-management";
import { ProjectManagementPage } from "modules/project-management";
import { SecurityPage } from "modules/security";
import { pluginStore } from "plugins";
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
        await AuthManager.removeUser();
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
          element={
            <PrivateRoute
              element={
                <AppContainer>
                  <Routes>
                    <Route
                      path="/projects/*"
                      element={<ProjectManagementPage />}
                    />
                  </Routes>
                </AppContainer>
              }
            />
          }
        />
        <Route path="/security/*" element={<SecurityPage />} />
      </Routes>
    </PluginProvider>
  );
};

export default App;
