import { ChevronLeft, Menu } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Renderer } from "plugins";
import { useState } from "react";
import * as Styles from "./Header.styles";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerPermanent = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleDrawer = /* istanbul ignore next */ () =>
    setDrawerOpen((open) => !open);

  return (
    <>
      <Styles.AppBar position="fixed" open={drawerOpen}>
        <Styles.Toolbar>
          {!drawerOpen && (
            <Styles.ToggleDrawerButton color="inherit" onClick={toggleDrawer}>
              <Menu />
            </Styles.ToggleDrawerButton>
          )}
          <Styles.Title variant="h6" component="div">
            Projectify
          </Styles.Title>
          <Renderer section="app-header" />
        </Styles.Toolbar>
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
          <Renderer section="app-sidebar" />
        </List>
      </Styles.Drawer>
    </>
  );
};

export default Header;
