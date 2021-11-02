import { Assignment, ChevronLeft, Menu } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Renderer } from "plugins";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as Styles from "./Header.styles";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerPermanent = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleDrawer = /* istanbul ignore next */ () =>
    setDrawerOpen((open) => !open);

  return (
    <>
      <Styles.AppBar position="fixed">
        <Toolbar>
          <Styles.ToggleDrawerButton color="inherit" onClick={toggleDrawer}>
            {drawerOpen ? <ChevronLeft /> : <Menu />}
          </Styles.ToggleDrawerButton>
          <Typography flexGrow={1} variant="h6" component="div">
            Projectify
          </Typography>
          <Renderer section="app-header" />
        </Toolbar>
      </Styles.AppBar>
      <Styles.Drawer
        variant={isDrawerPermanent ? "permanent" : "temporary"}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Styles.DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </Styles.DrawerHeader>
        <Divider />
        <List>
          {/* TODO: generate this with plugins ! */}
          <Styles.ListItem component={NavLink} to="/">
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </Styles.ListItem>
        </List>
      </Styles.Drawer>
    </>
  );
};

export default Header;
