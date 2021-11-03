import { ListItem as MUIListItem, styled } from "@mui/material";

export const ListItem = styled(MUIListItem)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.action.selected,
  },
})) as any as typeof MUIListItem;
