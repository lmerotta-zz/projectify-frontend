import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, act, waitFor } from "test-utils";
import { MemoryRouter } from "react-router";
import AuthManager from "utils/AuthManager";
import LoginPage, { LOGIN_MUTATION } from "./LoginPage";
import { toast } from "react-toastify";

jest.mock("utils/AuthManager", () => ({
  login: jest.fn(),
}));

describe("LoginPage unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Returns invalid credential on wrong username login", async () => {
    const toastSpy = jest.spyOn(toast, "error");

    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            username: "failed@test.com",
            password: "test",
          },
        },
        error: {
          result: {
            error: "test",
          },
        },
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks as any} addTypename={false}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.input(result.getByTestId("input-email"), {
      target: { value: "failed@test.com" },
    });
    fireEvent.input(result.getByTestId("input-password"), {
      target: { value: "test" },
    });

    await act(async () => {
      fireEvent.click(result.getByTestId("btn-login"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => expect(toastSpy).toHaveBeenCalled());
  });

  it("Stores the oauth code when request succeeds", async () => {
    const toastSpy = jest.spyOn(toast, "error");

    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            username: "success@test.com",
            password: "test",
          },
        },
        result: {
          data: null,
        },
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks as any} addTypename={false}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();

    fireEvent.input(result.getByTestId("input-email"), {
      target: { value: "success@test.com" },
    });
    fireEvent.input(result.getByTestId("input-password"), {
      target: { value: "test" },
    });

    await act(async () => {
      fireEvent.click(result.getByTestId("btn-login"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(toastSpy).not.toHaveBeenCalled();
    expect(AuthManager.login).toHaveBeenCalled();
  });
});
