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
import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as Styles from "./Header.styles";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerPermanent = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Styles.AppBar position="fixed">
        <Toolbar>
          <Styles.ToggleDrawerButton
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <ChevronLeft /> : <Menu />}
          </Styles.ToggleDrawerButton>
          <Typography flexGrow={1} variant="h6" component="div">
            Projectify
          </Typography>
        </Toolbar>
      </Styles.AppBar>
      <Styles.Drawer
        variant={isDrawerPermanent ? "permanent" : "temporary"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Styles.DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </Styles.DrawerHeader>
        <Divider />
        <List>
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
