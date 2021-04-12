import { render, fireEvent } from "test-utils";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

describe("Modal unit tests", () => {
  it("Closes on backdrop click", () => {
    const close = jest.fn();
    const result = render(
      <Modal onClose={close} closeOnOutsideClick isOpen>
        <ModalBody>This is the body</ModalBody>
        <ModalFooter>This is the footer</ModalFooter>
      </Modal>
    );

    fireEvent.click(result.getByTestId("modal-backdrop"));

    expect(close).toHaveBeenCalled();
    expect(result.asFragment()).toMatchSnapshot();
  });

  it("Does not close on backdrop click", () => {
    const close = jest.fn();
    const result = render(
      <Modal onClose={close} isOpen>
        <ModalBody>This is the body</ModalBody>
        <ModalFooter leftAlign>This is the footer</ModalFooter>
      </Modal>
    );

    fireEvent.click(result.getByTestId("modal-backdrop"));

    expect(close).not.toHaveBeenCalled();
    expect(result.asFragment()).toMatchSnapshot();
  });

  it("Does not render if not open", () => {
    const result = render(
      <Modal>
        <ModalBody>This is the body</ModalBody>
        <ModalFooter>This is the footer</ModalFooter>
      </Modal>
    );

    expect(() => result.getByTestId("modal-backdrop")).toThrow();
  });
});
