import { render } from "test-utils";
import Link from "./Link";
import each from "jest-each";
import { MemoryRouter } from "react-router";

describe("Link unit tests", () => {
  each([["dark"], ["secondary"]]).it("Renders with color %s", (color) => {
    const { asFragment } = render(
      <MemoryRouter>
        <Link to="#" color={color}>
          My Link
        </Link>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
