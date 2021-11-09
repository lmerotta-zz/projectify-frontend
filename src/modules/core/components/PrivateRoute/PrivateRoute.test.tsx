import { isAuthenticated } from "apollo/local-state";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "test-utils";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute unit tests", () => {
  afterEach(() => {
    isAuthenticated(null);
  });

  it("Renders null by default", () => {
    const result = render(
      <Router initialEntries={["/testing"]}>
        <Routes>
          <Route
            path="/testing"
            element={<PrivateRoute element={<h1>Test</h1>} />}
          />
          <Route path="/security/login" element={<h1>Security</h1>} />
        </Routes>
      </Router>
    );

    expect(() => result.getByText("Test")).toThrow();
    result.unmount();
  });

  it("Redirects to login page if authenticated is false", () => {
    isAuthenticated(false);
    const result = render(
      <Router initialEntries={["/testing"]}>
        <Routes>
          <Route
            path="/testing"
            element={<PrivateRoute element={<h1>Test</h1>} />}
          />
          <Route path="/security/login" element={<h1>Security</h1>} />
        </Routes>
      </Router>
    );

    expect(result.getByText("Security")).toBeVisible();
    result.unmount();
  });

  it("Shows testing if authenticated is true", () => {
    isAuthenticated(true);
    const result = render(
      <Router initialEntries={["/testing"]}>
        <Routes>
          <Route
            path="/testing"
            element={<PrivateRoute element={<h1>Test</h1>} />}
          />
          <Route path="/security/login" element={<h1>Security</h1>} />
        </Routes>
      </Router>
    );

    expect(result.getByText("Test")).toBeVisible();
    result.unmount();
  });
});
