import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  Drawer as MUIDrawer,
  IconButton,
  styled,
} from "@mui/material";

type AppBarProps = MUIAppBarProps & { open: boolean };

export const AppBar = styled(MUIAppBar)<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: "240px",
    width: "calc(100% - 240px)",
  }),
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
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

export const ToggleDrawerButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));
