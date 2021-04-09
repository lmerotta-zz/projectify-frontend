import { render } from "test-utils";
import Title from "./Title";

describe("Title unit tests", () => {
  it("Renders", () => {
    const { asFragment } = render(<Title>My title</Title>);

    expect(asFragment()).toMatchSnapshot();
  });
});
