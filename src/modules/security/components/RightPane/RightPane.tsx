import { ReactNode } from "react";
import * as Styles from "./RightPane.styles";

type RightPaneProps = {
  children: ReactNode;
};

const variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const RightPane = ({ children }: RightPaneProps) => (
  <Styles.RightPane
    variants={variants}
    item
    xs={12}
    md={5}
    lg={4}
    initial="initial"
    animate="in"
    exit="out"
  >
    {children}
  </Styles.RightPane>
);

export default RightPane