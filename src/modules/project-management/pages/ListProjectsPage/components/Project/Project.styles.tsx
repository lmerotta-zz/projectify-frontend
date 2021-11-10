import { Avatar as MUIAvatar, styled, TableRow } from "@mui/material";

export const Avatar = styled(MUIAvatar)(({ theme }) => ({
  display: "inline-flex",
  marginRight: theme.spacing(2),
}));

export const MainTableRow = styled(TableRow)(() => ({
  "& > *": { borderBottom: "unset" },
}));
