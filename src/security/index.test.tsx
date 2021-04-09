import { render } from "test-utils";
import { MemoryRouter } from "react-router-dom";
import SecurityPage from ".";

describe("Security main page unit tests", () => {
  it("Renders", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SecurityPage />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
