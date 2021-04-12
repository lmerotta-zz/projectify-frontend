/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import * as Styles from "./Modal.styles";

const backdropVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const wrapperVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: "-100%",
  },
};

type ModalProps = {
  onClose?: () => void;
  isOpen?: boolean;
  closeOnOutsideClick?: boolean;
  children?: ReactNode;
};

const Modal = ({
  onClose,
  isOpen,
  children,
  closeOnOutsideClick = false,
}: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <Styles.Backdrop
        data-testid="modal-backdrop"
        key="modal-backdrop"
        variants={backdropVariants}
        initial="closed"
        animate="open"
        exit="closed"
        onClick={(e) => {
          /* istanbul ignore else */
          if (e.target === e.currentTarget) {
            closeOnOutsideClick && onClose?.();
          }
        }}
      >
        <Styles.Wrapper
          variants={wrapperVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {children}
        </Styles.Wrapper>
      </Styles.Backdrop>
    )}
  </AnimatePresence>
);

export default Modal;
