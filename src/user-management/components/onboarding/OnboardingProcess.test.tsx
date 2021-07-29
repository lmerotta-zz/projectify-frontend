import { render, waitFor, act } from "test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { isAuthenticated } from "apollo/local-state";
import OnboardingProcess, { CURRENT_USER_QUERY } from "./OnboardingProcess";
import { UserStatus } from "generated/graphql";

jest.mock("./OnboardingModal", () => () => (
  <div data-testid="onboarding-modal" />
));

describe("OnboardingProcess unit tests", () => {
  beforeEach(() => {
    isAuthenticated(null);
  });

  it("renders nothing if query not finished", () => {
    const result = render(
      <MockedProvider addTypename={false} mocks={[]}>
        <OnboardingProcess />
      </MockedProvider>
    );

    expect(result.container).toBeEmptyDOMElement();
  });

  it("renders the modal when the query is finished", async () => {
    isAuthenticated(true);
    const mocks = [
      {
        request: {
          query: CURRENT_USER_QUERY,
        },
        result: {
          data: {
            currentUser: {
              id: "abcdef",
              firstName: "test",
              lastName: "tost",
              status: UserStatus.Onboarded,
            },
          },
        },
      },
    ];

    const result = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <OnboardingProcess />
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() =>
      expect(result.getByTestId("onboarding-modal")).toBeVisible()
    );
  });
});
