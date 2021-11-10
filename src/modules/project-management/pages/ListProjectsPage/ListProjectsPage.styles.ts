import {
  Container as MUIContainer,
  styled,
  TableContainer as MUITableContainer,
} from "@mui/material";

export const TableContainer = styled(MUITableContainer)(() => ({
  flex: 1,
  flexGrow: 1,
})) as typeof MUITableContainer;

export const Container = styled(MUIContainer)(() => ({
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
}));
