import { isAuthenticated } from "apollo/local-state";
import { Route, Routes } from "react-router";
import { renderWithProviders, waitFor } from "test-utils";
import SecurityPage from "./SecurityPage";

describe("SecurityPage functional tests", () => {
  afterEach(() => {
    isAuthenticated(null);
  });

  it("Redirects to / if user already logged in", async () => {
    isAuthenticated(true);

    const { getByText, unmount } = renderWithProviders(
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Root</h1>
            </>
          }
        />
        <Route path="/*" element={<SecurityPage />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/login"] },
      }
    );

    await waitFor(() => expect(getByText("Root")).toBeVisible());

    unmount();
  });

  it("Does nothing if isAuthenticated is not defined", async () => {
    const { getByTestId, unmount } = renderWithProviders(
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Root</h1>
            </>
          }
        />
        <Route path="/*" element={<SecurityPage />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/login"] },
      }
    );

    expect(getByTestId("root")).toBeEmptyDOMElement();

    unmount();
  });
});
