import { Grid, styled } from "@mui/material";
import { motion } from "framer-motion";

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
