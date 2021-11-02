import { Ability, AbilityBuilder } from "@casl/ability";
import { usePermissions } from "hooks";
import { renderWithProviders } from "test-utils";
import Can from "./Can";

jest.mock("hooks", () => ({
  ...jest.requireActual("hooks"),
  usePermissions: jest.fn(),
}));

describe("Can unit tests", () => {
  it("renders the children if permission is granted", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.can("view-self", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <Can I="view-self" a="User">
        <h1 data-testid="testing">Testing</h1>
      </Can>
    );

    expect(getByTestId("testing")).toBeVisible();
  });

  it("does not the children if permission is not granted", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.cannot("view-self", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <Can I="view-self" a="User">
        <h1 data-testid="testing">Testing</h1>
      </Can>
    );

    expect(() => getByTestId("testing")).toThrow();
  });

  it("Accept a render prop", () => {
    usePermissions.mockImplementation(() => {
      const builder = new AbilityBuilder(Ability);
      builder.cannot("view-self", "User");
      builder.can("edit-self", "User");

      return builder.build();
    });

    const { getByTestId } = renderWithProviders(
      <>
        <Can I="view-self" a="User" passThrough>
          {(allowed) => (
            <h1 data-testid="view-self">{JSON.stringify(allowed)}</h1>
          )}
        </Can>
        <Can I="edit-self" a="User">
          {(allowed) => (
            <h1 data-testid="edit-self">{JSON.stringify(allowed)}</h1>
          )}
        </Can>
      </>
    );

    expect(getByTestId("view-self")).toHaveTextContent("false");
    expect(getByTestId("edit-self")).toHaveTextContent("true");
  });
});
