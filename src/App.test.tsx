import { render, waitFor } from "test-utils";
import { isAuthenticated } from "apollo/local-state";
import App from "App";
import { MemoryRouter } from "react-router-dom";
import AuthManager from "utils/AuthManager";

jest.mock("utils/AuthManager", () => ({
  isLoggedIn: jest.fn(),
}));

jest.mock("apollo/local-state", () => ({
  isAuthenticated: jest.fn(),
}));

describe("App unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Renders and sets isAuthenticated to false", async () => {
    jest.useFakeTimers();
    AuthManager.isLoggedIn.mockImplementation(
      async () => await new Promise((resolve, reject) => reject({ wow: true }))
    );
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
    jest.runAllTimers();
    await waitFor(() => expect(isAuthenticated).toHaveBeenCalledWith(false));
  });

  it("Renders and sets isAuthenticated to true", async () => {
    jest.useFakeTimers();
    AuthManager.isLoggedIn.mockImplementation(
      async () => await new Promise((resolve) => resolve({ wow: true }))
    );
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
    jest.runAllTimers();
    await waitFor(() => expect(isAuthenticated).toHaveBeenCalledWith(true));
  });
});
