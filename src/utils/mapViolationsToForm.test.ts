import { ApolloError } from "@apollo/client";
import mapViolationsToForm from "./mapViolationsToForm";

describe("Validation error mapping unit test", () => {
  it("Calls the callback for each property, and returns true", () => {
    const formError = jest.fn();
    const error = {
      graphQLErrors: [
        {
          extensions: {
            violations: [
              {
                path: "name",
                message: "This is an error",
              },
            ],
          },
        },
      ],
    };

    const result = mapViolationsToForm(
      formError,
      (error as unknown) as ApolloError
    );

    expect(result).toBe(true);
    expect(formError).toHaveBeenCalledWith("name", {
      type: "server",
      message: "This is an error",
    });
  });

  it("Returns false if no errors are present to map", () => {
    const formError = jest.fn();
    let error: any = {
      graphQLErrors: [],
    };

    expect(
      mapViolationsToForm(formError, (error as unknown) as ApolloError)
    ).toBe(false);

    error = {
      graphQLErrors: [
        {
          extensions: undefined,
        },
      ],
    };

    expect(
      mapViolationsToForm(formError, (error as unknown) as ApolloError)
    ).toBe(false);

    error = {
      graphQLErrors: [
        {
          extensions: {
            violations: undefined,
          },
        },
      ],
    };

    expect(
      mapViolationsToForm(formError, (error as unknown) as ApolloError)
    ).toBe(false);
  });
});
