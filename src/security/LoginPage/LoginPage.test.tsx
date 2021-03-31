import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthManager from "utils/AuthManager";
import LoginPage, { LOGIN_MUTATION } from "./LoginPage";

jest.mock("utils/AuthManager", () => ({
  login: jest.fn(),
}));

describe("LoginPage unit tests", () => {
  it("Returns invalid credential on wrong username login", async () => {
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

    expect(result.getByTestId("error-message-global")).toHaveTextContent(
      "test"
    );
  });

  it("Stores the oauth code when request succeeds", async () => {
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

    expect(() => result.getByTestId("error-message-global")).toThrow();
    expect(AuthManager.login).toHaveBeenCalled();
  });
});
