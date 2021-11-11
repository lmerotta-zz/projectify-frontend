import { Box, styled } from "@mui/material";

const RightPaneFormWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  fontWeight: "bold",

  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
})) as typeof Box;

export default RightPaneFormWrapper;
