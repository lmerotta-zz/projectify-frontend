import { render } from "@testing-library/react";
import App from "App";
import { MemoryRouter } from "react-router-dom";

describe("App unit tests", () => {
  it("Renders", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
