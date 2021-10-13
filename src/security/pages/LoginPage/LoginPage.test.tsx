import { Navigate, Route, Routes } from "react-router-dom";
import { renderWithProviders, userEvent, waitFor } from "test-utils";
import AuthManager from "utils/AuthManager";
import SecurityPage from "../SecurityPage/SecurityPage";
import { LOGIN_MUTATION } from "./LoginPage";

describe("LoginPage functional tests", () => {
  it("Returns an invalid credentials error on wrong credentials", async () => {
    jest.spyOn(AuthManager, "login").mockImplementation(async () => {});

    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            username: "failed@test.com",
            password: "test",
          },
        },
        error: new Error("Error occured"),
      },
    ];

    const { getByLabelText, getByText, asFragment } = renderWithProviders(
      <SecurityPage />,
      {
        routerProps: { initialEntries: ["/login"] },
        graphqlProps: { mocks: mocks },
      }
    );

    await waitFor(() =>
      expect(getByText("security.login_page.page_title")).toBeVisible()
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.type(
      getByLabelText("security.login_page.form.label_email"),
      "failed@test.com"
    );
    userEvent.type(
      getByLabelText("security.login_page.form.label_password"),
      "passwordfailure"
    );
    userEvent.click(getByText("security.login_page.form.btn_login"));

    await waitFor(() =>
      expect(getByText("global.errors.internal-server-error")).toBeVisible()
    );
  });

  it("Logs in in with the correct referer", async () => {
    const authManagerSpy = jest
      .spyOn(AuthManager, "login")
      .mockImplementation(async () => {});

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
          data: {
            login: null,
          },
        },
      },
    ];

    const { getByLabelText, getByText } = renderWithProviders(
      <Routes>
        <Route
          path="/test"
          element={
            <Navigate
              to="/login"
              replace
              state={{
                referrer: { pathname: "/referred-by", search: "", hash: "" },
              }}
            />
          }
        />
        <Route path="*" element={<SecurityPage />} />
      </Routes>,
      {
        routerProps: { initialEntries: ["/test"] },
        graphqlProps: { mocks: mocks },
      }
    );

    await waitFor(() =>
      expect(getByText("security.login_page.page_title")).toBeVisible()
    );

    userEvent.type(
      getByLabelText("security.login_page.form.label_email"),
      "success@test.com"
    );
    userEvent.type(
      getByLabelText("security.login_page.form.label_password"),
      "test"
    );
    userEvent.click(getByText("security.login_page.form.btn_login"));

    await waitFor(() =>
      expect(authManagerSpy).toHaveBeenCalledWith({ state: "/referred-by" })
    );
  });
});
