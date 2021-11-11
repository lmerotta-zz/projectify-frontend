import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  Drawer as MUIDrawer,
  IconButton,
  styled,
  Toolbar as MUIToolbar,
  Typography,
} from "@mui/material";

type AppBarProps = MUIAppBarProps & { open: boolean };

export const AppBar = styled(MUIAppBar)<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("sm")]: {
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      marginLeft: "240px",
      width: "calc(100% - 240px)",
    }),
  },
}));

export const Toolbar = styled(MUIToolbar)(({ theme }) => ({
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
    paddingTop: theme.spacing(1),
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  "@media all": {
    alignSelf: "flex-end",
  },
})) as typeof Typography;

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
  ...(theme.mixins.toolbar as any),
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  [theme.breakpoints.up("sm")]: {
    minHeight: 128,
  },
}));

export const ToggleDrawerButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));
