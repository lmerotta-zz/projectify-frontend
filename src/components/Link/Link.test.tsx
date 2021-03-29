import { render } from "@testing-library/react";
import Link from "./Link";
import each from "jest-each";

describe("Link unit tests", () => {
  each([["dark"], ["secondary"]]).it("Renders with color %s", (color) => {
    const { asFragment } = render(
      <Link href="#" color={color}>
        My Link
      </Link>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
