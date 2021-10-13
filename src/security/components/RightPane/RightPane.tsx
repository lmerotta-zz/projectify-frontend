import { Variants } from "framer-motion";
import { ReactNode } from "react";
import * as Styles from "./RightPane.styles";

const defaultVariants = {
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

type RightPaneProps = {
  animationVariants?: Variants;
  children: ReactNode;
};

const RightPane = ({ animationVariants, children }: RightPaneProps) => (
  <Styles.RightPane
    item
    xs={12}
    md={5}
    lg={4}
    variants={animationVariants || defaultVariants}
  >
    {children}
  </Styles.RightPane>
);

export default RightPane;
