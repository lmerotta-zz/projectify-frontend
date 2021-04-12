/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import * as Styles from "./ModalHeader.styles";

type ModalHeaderProps = {
  children?: ReactNode;
  onClose?: () => void;
};

const ModalHeader = ({ children, onClose }: ModalHeaderProps) => (
  <Styles.ModalHeaderWrapper>
    <Styles.ModalHeaderTitle>{children}</Styles.ModalHeaderTitle>
    {onClose && (
      <Styles.ModalHeaderCloseButtonWrapper
        data-testid="modal-close-button"
        onClick={() => onClose()}
      >
        <Styles.ModalHeaderCloseButton />
      </Styles.ModalHeaderCloseButtonWrapper>
    )}
  </Styles.ModalHeaderWrapper>
);

export default ModalHeader;
