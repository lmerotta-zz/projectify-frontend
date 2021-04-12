import { render, fireEvent } from "test-utils";
import ModalHeader from "./ModalHeader";

describe("ModalHeader unit tests", () => {
  it("Does not render a close button", () => {
    const result = render(<ModalHeader>This is my title</ModalHeader>);

    expect(() => result.getByTestId("modal-close-button")).toThrow();
    expect(result.asFragment()).toMatchSnapshot();
  });

  it("Renders a close button that reacts on click", () => {
    const close = jest.fn();
    const result = render(
      <ModalHeader onClose={close}>This is my title</ModalHeader>
    );

    expect(result.getByTestId("modal-close-button")).toBeVisible();
    expect(result.asFragment()).toMatchSnapshot();

    fireEvent.click(result.getByTestId("modal-close-button"));

    expect(close).toHaveBeenCalled();
  });
});
