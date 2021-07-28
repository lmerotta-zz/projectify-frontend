import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, act } from "test-utils";
import { MemoryRouter, Router } from "react-router";
import { createMemoryHistory } from "history";
import RegisterPage, { REGISTER_MUTATION } from "./RegisterPage";
import routePrefixes from "utils/routing-prefix";
import { toast } from "react-toastify";

describe("RegisterPage unit tests", () => {
  it("Shows a global error on server error", async () => {
    const toastSpy = jest.spyOn(toast, "error");
    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            firstName: "test",
            lastName: "test",
            email: "test@test.com",
            password: "test",
            repeatPassword: "test",
          },
        },
        error: new Error("test"),
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks as any} addTypename={false}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();

    fireEvent.input(result.getByTestId("input-firstName"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-password"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-lastName"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(result.getByTestId("input-repeatPassword"), {
      target: { value: "test" },
    });

    await act(async () => {
      fireEvent.click(result.getByTestId("btn-register"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(toastSpy).toHaveBeenCalled();
  });

  it("Redirects to the login page on success", async () => {
    const toastSpy = jest.spyOn(toast, "success");

    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            firstName: "test",
            lastName: "test",
            email: "test@test.com",
            password: "test",
          },
        },
        result: {},
      },
    ];

    const history = createMemoryHistory();
    history.push("/test");

    const result = render(
      <MockedProvider mocks={mocks as any} addTypename={false}>
        <Router history={history}>
          <RegisterPage />
        </Router>
      </MockedProvider>
    );

    fireEvent.input(result.getByTestId("input-firstName"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-password"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-lastName"), {
      target: { value: "test" },
    });
    fireEvent.input(result.getByTestId("input-email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(result.getByTestId("input-repeatPassword"), {
      target: { value: "test" },
    });

    await act(async () => {
      fireEvent.click(result.getByTestId("btn-register"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "security.register_page.message.user_created"
    );
    expect(history.location.pathname).toEqual(
      `${routePrefixes.security}/login`
    );
  });
});
