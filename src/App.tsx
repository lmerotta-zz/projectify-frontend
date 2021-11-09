import { captureException } from "@sentry/minimal";
import { isAuthenticated } from "apollo/local-state";
import { AppContainer, PrivateRoute } from "modules/core";
import "modules/project-management";
import { ProjectManagementPage } from "modules/project-management";
import { SecurityPage } from "modules/security";
import { pluginStore } from "plugins";
import { useEffect } from "react";
import { PluginProvider } from "react-pluggable";
import { Navigate, Route, Routes } from "react-router-dom";
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
                    <Route
                      path="*"
                      element={<Navigate to="/projects" replace />}
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
