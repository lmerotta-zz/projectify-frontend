import { ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import * as Styles from "./HeaderListItem.styles";

type HeaderListItemProps = {
  icon: ReactNode;
  primary: ReactNode;
  to: NavLinkProps["to"];
};

const HeaderListItem = ({ icon, primary, to }: HeaderListItemProps) => (
  <Styles.ListItem button component={NavLink} to={to}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} />
  </Styles.ListItem>
);

export default HeaderListItem;
