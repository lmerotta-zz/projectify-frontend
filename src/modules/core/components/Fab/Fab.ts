import { Fab as MUIFab, styled } from "@mui/material";

const Fab = styled(MUIFab)(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer + 2,
  right: theme.spacing(2),
  top: 128,
  transform: "translateY(-50%)",
  [theme.breakpoints.up("sm")]: {
    right: theme.spacing(10),
  },
}));

export default Fab;
