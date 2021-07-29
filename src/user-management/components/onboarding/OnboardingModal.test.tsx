import { render, fireEvent, act } from "test-utils";
import { MockedProvider } from "@apollo/client/testing";
import OnboardingModal, { ONBOARD_USER_MUTATION } from "./OnboardingModal";
import { toast } from "react-toastify";
import { GraphQLError } from "graphql";
import { UserStatus } from "generated/graphql";

describe("OnboardingModal unit tests", () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  });
  it("throws an error if the user is already onboarded", async () => {
    const toastSpy = jest.spyOn(toast, "error");
    const file = new File(["file"], "test.png", {
      type: "image/png",
    });

    const mocks = [
      {
        request: {
          query: ONBOARD_USER_MUTATION,
          variables: {
            firstName: "test",
            lastName: "tost",
            picture: file,
          },
        },
        result: {
          errors: [
            new GraphQLError(
              "onboarding failed",
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              {
                exception_code: 4203,
              }
            ),
          ],
        },
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks}>
        <OnboardingModal
          user={{
            __typename: "User",
            firstName: "test",
            lastName: "tost",
            id: "abcd",
            status: UserStatus.SignedUpOauth,
          }}
        />
      </MockedProvider>
    );

    expect(result.getByTestId("input-firstName")).not.toHaveAttribute(
      "readonly"
    );
    expect(result.getByTestId("input-lastName")).not.toHaveAttribute(
      "readonly"
    );

    const fileInput = result.getByTestId("file-input-picture");
    await act(async () => {
      Object.defineProperty(fileInput, "files", {
        value: [file],
      });
    });

    await act(async () => {
      await fireEvent.drop(fileInput);
    });

    await act(async () => {
      await fireEvent.click(result.getByTestId("onboarding-modal-submit"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "usermanagement.onboarding.modal.error.user_already_onboarded"
    );
    expect(result.asFragment()).toMatchSnapshot();
  });

  it("throws an error if the server fails", async () => {
    const toastSpy = jest.spyOn(toast, "error");
    const file = new File(["file"], "test.png", {
      type: "image/png",
    });

    const mocks = [
      {
        request: {
          query: ONBOARD_USER_MUTATION,
          variables: {
            firstName: "test",
            lastName: "tost",
            picture: file,
          },
        },
        result: {
          errors: [new GraphQLError("onboarding failed")],
        },
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks}>
        <OnboardingModal
          user={{
            __typename: "User",
            firstName: "test",
            lastName: "tost",
            id: "abcd",
            status: UserStatus.SignedUpOauth,
          }}
        />
      </MockedProvider>
    );

    const fileInput = result.getByTestId("file-input-picture");
    await act(async () => {
      Object.defineProperty(fileInput, "files", {
        value: [file],
      });
    });

    await act(async () => {
      await fireEvent.drop(fileInput);
    });

    await act(async () => {
      await fireEvent.click(result.getByTestId("onboarding-modal-submit"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "global.errors.internal-server-error"
    );
  });

  it("Shows a success message if onboarding is successfull", async () => {
    const toastSpy = jest.spyOn(toast, "success");
    const file = new File(["file"], "test.png", {
      type: "image/png",
    });

    const mocks = [
      {
        request: {
          query: ONBOARD_USER_MUTATION,
          variables: {
            firstName: "test",
            lastName: "tost",
            picture: file,
          },
        },
        result: {
          data: {
            user: {
              id: "abcd",
              status: UserStatus.Onboarded,
              profilePictureUrl: "url",
            },
          },
        },
      },
    ];

    const result = render(
      <MockedProvider mocks={mocks}>
        <OnboardingModal
          user={{
            __typename: "User",
            firstName: "test",
            lastName: "tost",
            id: "abcd",
            status: UserStatus.SignedUpOauth,
          }}
        />
      </MockedProvider>
    );

    const fileInput = result.getByTestId("file-input-picture");
    await act(async () => {
      Object.defineProperty(fileInput, "files", {
        value: [file],
      });
    });

    await act(async () => {
      await fireEvent.drop(fileInput);
    });

    await act(async () => {
      await fireEvent.click(result.getByTestId("onboarding-modal-submit"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(toastSpy).toHaveBeenCalledWith(
      "usermanagement.onboarding.modal.user_onboarded"
    );
  });

  it("Puts first name and last name as readonly if user is signed up normally", async () => {
    const result = render(
      <MockedProvider mocks={[]}>
        <OnboardingModal
          user={{
            __typename: "User",
            firstName: "test",
            lastName: "tost",
            id: "abcd",
            status: UserStatus.SignedUp,
          }}
        />
      </MockedProvider>
    );

    expect(result.getByTestId("input-firstName")).toHaveAttribute("readonly");
    expect(result.getByTestId("input-lastName")).toHaveAttribute("readonly");
    expect(result.asFragment()).toMatchSnapshot();
  });
});
