import { render } from "test-utils";
import { Router, Switch } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { isAuthenticated } from "apollo/local-state";
import PrivateRoute from "./PrivateRoute";
import routingPrefix from "utils/routing-prefix";

describe("PrivateRoute unit tests", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push("/testing");
  });

  afterEach(() => {
    isAuthenticated(null);
  });

  it("Renders null by default", () => {
    const result = render(
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/testing" component={() => <h1>Test</h1>} />
        </Switch>
      </Router>
    );

    expect(result.container).toBeEmptyDOMElement();
    result.unmount();
  });

  it("Redirects to login page if authenticated is false", () => {
    isAuthenticated(false);
    const result = render(
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/testing" component={() => <h1>Test</h1>} />
        </Switch>
      </Router>
    );

    expect(history.location.pathname).toEqual(
      `${routingPrefix.security}/login`
    );
    result.unmount();
  });

  it("Shows testing if authenticated is true", () => {
    isAuthenticated(true);
    const result = render(
      <Router history={history}>
        <Switch>
          <PrivateRoute
            path="/testing"
            component={() => <h1 data-testid="testing">Test</h1>}
          />
        </Switch>
      </Router>
    );

    expect(history.location.pathname).toEqual("/testing");
    expect(result.getByTestId("testing")).not.toBeEmptyDOMElement();
    result.unmount();
  });
});
