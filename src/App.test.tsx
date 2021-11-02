import { isAuthenticated } from "apollo/local-state";
import App from "App";
import { renderWithProviders, waitFor } from "test-utils";
import AuthManager from "utils/AuthManager";

jest.mock("utils/AuthManager", () => ({
  isLoggedIn: jest.fn(),
  removeUser: jest.fn(),
}));

describe("App unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    isAuthenticated(null);
  });

  it("Renders and sets isAuthenticated to false", async () => {
    jest.useFakeTimers();
    AuthManager.isLoggedIn.mockImplementation(
      async () => await new Promise((resolve, reject) => reject({ wow: true }))
    );
    const { asFragment } = renderWithProviders(<App />);

    expect(asFragment()).toMatchSnapshot();
    jest.runAllTimers();
    await waitFor(() => expect(isAuthenticated()).toBe(false));
  });

  it("Renders and sets isAuthenticated to true", async () => {
    jest.useFakeTimers();
    AuthManager.isLoggedIn.mockImplementation(
      async () => await new Promise((resolve) => resolve({ wow: true }))
    );
    const { asFragment } = renderWithProviders(<App />);

    expect(asFragment()).toMatchSnapshot();
    jest.runAllTimers();
    await waitFor(() => expect(isAuthenticated()).toBe(true));
  });
});
