import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";
import {
  CircularProgress,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { render as realRender, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode, Suspense } from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import theme from "theme";

function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries"> & {
    routerProps?: MemoryRouterProps;
    graphqlProps?: MockedProviderProps;
  }
) {
  const Wrapper = ({ children }: { children?: ReactNode }) => {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ToastContainer
            theme="colored"
            autoClose={3000}
            containerId="react-toastify"
          />
          <MockedProvider {...options?.graphqlProps} addTypename={false}>
            <MemoryRouter {...options?.routerProps}>
              <Suspense fallback={<CircularProgress />}>
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <>
                        <h1>TESTSASATATAST</h1>
                        {children}
                      </>
                    }
                  />
                </Routes>
              </Suspense>
            </MemoryRouter>
          </MockedProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };

  return realRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithProviders };
