import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginPage, { AUTHORIZE_QUERY, LOGIN_MUTATION } from "./LoginPage";

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

  it("Returns another error message if authorize fails", async () => {
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
      {
        request: {
          query: AUTHORIZE_QUERY,
          variables: {
            challenge: "UdFfYchv1a6tryk3-n_EsFm9CuBZqq5ICCv29SXTiiI",
          },
        },
        error: new Error("test"),
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

    expect(result.getByTestId("error-message-global")).toHaveTextContent(
      "An error occured, please try again later"
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
      {
        request: {
          query: AUTHORIZE_QUERY,
          variables: {
            challenge: "UdFfYchv1a6tryk3-n_EsFm9CuBZqq5ICCv29SXTiiI",
          },
        },
        result: {
          data: {
            code: "abc123",
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
  });
});
