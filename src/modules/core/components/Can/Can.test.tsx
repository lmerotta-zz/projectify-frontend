import { Ability, AbilityBuilder } from "@casl/ability";
import { usePermissions } from "modules/core";
import { renderWithProviders } from "test-utils";
import Can from "./Can";

jest.mock("modules/core", () => ({
  usePermissions: jest.fn(),
}));

describe("Can unit tests", () => {
  it("renders the children if permission is granted", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.can("view", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <Can I="view" a="User">
        <h1 data-testid="testing">Testing</h1>
      </Can>
    );

    expect(getByTestId("testing")).toBeVisible();
  });

  it("does not the children if permission is not granted", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.cannot("view", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <Can I="view" a="User">
        <h1 data-testid="testing">Testing</h1>
      </Can>
    );

    expect(() => getByTestId("testing")).toThrow();
  });

  it("Accept a render prop", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.cannot("view", "User");
      builder.can("edit", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <>
        <Can I="view" a="User" passThrough>
          {(allowed) => (
            <h1 data-testid="view">{JSON.stringify(allowed)}</h1>
          )}
        </Can>
        <Can I="edit" a="User">
          {(allowed) => (
            <h1 data-testid="edit">{JSON.stringify(allowed)}</h1>
          )}
        </Can>
      </>
    );

    expect(getByTestId("view")).toHaveTextContent("false");
    expect(getByTestId("edit")).toHaveTextContent("true");
  });
});
