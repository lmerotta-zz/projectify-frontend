import { render } from "test-utils";
import SubTitle from "./SubTitle";

describe("SubTitle unit tests", () => {
  it("Renders", () => {
    const { asFragment } = render(<SubTitle>My SubTitle</SubTitle>);

    expect(asFragment()).toMatchSnapshot();
  });
});
