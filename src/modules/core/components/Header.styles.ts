import {
  AppBar as MUIAppBar,
  Drawer as MUIDrawer,
  IconButton,
  styled,
} from "@mui/material";

export const AppBar = styled(MUIAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Drawer = styled(MUIDrawer)(({ theme, open }) => ({
  ...(open && {
    width: "240px",
    "& .MuiDrawer-paper": {
      width: "240px",
    },
  }),

  [theme.breakpoints.up("sm")]: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(9),
    "& .MuiDrawer-paper": {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(9),
      overflow: "hidden",
      ...(open && { width: "240px" }),
    },
    overflow: "hidden",
    ...(open && {
      width: "240px",
    }),
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const ToggleDrawerButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));
