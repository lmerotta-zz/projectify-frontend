import { Grid, GridSize, styled } from "@mui/material";
import { motion } from "framer-motion";

const rightPaneVariants = {
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

export const rightPaneDefaultProps = {
  item: true,
  xs: 12 as GridSize,
  md: 5 as GridSize,
  lg: 4 as GridSize,
  variants: rightPaneVariants,
  initial: "initial",
  animate: "in",
  exit: "out",
};

export const RightPane = motion(
  styled(Grid)(({ theme }) => ({
    padding: theme.spacing(4),
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },

    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })) as typeof Grid
);
