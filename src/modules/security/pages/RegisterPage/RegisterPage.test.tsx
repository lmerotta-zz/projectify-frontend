import { isAuthenticated } from "apollo/local-state";
import { renderWithProviders, userEvent, waitFor } from "test-utils";
import SecurityPage from "../SecurityPage/SecurityPage";
import { REGISTER_MUTATION } from "./RegisterPage";

describe("RegisterPage functional tests", () => {
  beforeEach(() => {
    isAuthenticated(false);
  });

  afterEach(() => {
    isAuthenticated(null);
  });

  it("Returns a global error on server error", async () => {
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
        error: new Error("test"),
      },
    ];

    const { getByLabelText, getByText, asFragment, unmount } =
      renderWithProviders(<SecurityPage />, {
        routerProps: { initialEntries: ["/register"] },
        graphqlProps: { mocks: mocks },
      });

    await waitFor(() =>
      expect(getByText("security.register_page.page_title")).toBeVisible()
    );

    expect(asFragment()).toMatchSnapshot();

    userEvent.type(
      getByLabelText("security.register_page.form.label_firstName"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_lastName"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_email"),
      "test@test.com"
    );
    userEvent.type(
      getByText("security.register_page.form.label_password"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_repeatPassword"),
      "test"
    );
    userEvent.click(getByText("security.register_page.form.btn_register"));

    await waitFor(() =>
      expect(getByText("global.errors.internal-server-error")).toBeVisible()
    );

    unmount();
  });

  it("Redirects to the login page on success", async () => {
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
        result: {
          data: {
            createUser: null,
          },
        },
      },
    ];

    const { getByLabelText, getByText, unmount } = renderWithProviders(
      <SecurityPage />,
      {
        routerProps: { initialEntries: ["/register"] },
        graphqlProps: { mocks: mocks },
      }
    );

    await waitFor(() =>
      expect(getByText("security.register_page.page_title")).toBeVisible()
    );

    userEvent.type(
      getByLabelText("security.register_page.form.label_firstName"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_lastName"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_email"),
      "test@test.com"
    );
    userEvent.type(
      getByText("security.register_page.form.label_password"),
      "test"
    );
    userEvent.type(
      getByLabelText("security.register_page.form.label_repeatPassword"),
      "test"
    );
    userEvent.click(getByText("security.register_page.form.btn_register"));

    await waitFor(() =>
      expect(
        getByText("security.register_page.message.user_created")
      ).toBeVisible()
    );

    unmount();
  });
});
