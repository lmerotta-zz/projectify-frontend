import { render } from "@testing-library/react";
import Button from "./Button";
import each from "jest-each";

describe("Button unit tests", () => {
  each([["primary"], ["secondary"]]).it("Renders with color %s", (color) => {
    const { asFragment } = render(
      <>
        <Button color={color}>My Button</Button>
        <Button color={color} disabled>
          My disabled Button
        </Button>
      </>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
