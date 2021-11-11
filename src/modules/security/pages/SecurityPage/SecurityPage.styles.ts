import { Box, Grid, styled, Typography } from "@mui/material";
import background from "../../images/background.svg";

export const Wrapper = styled(Grid)({
  minHeight: "100vh",
});

export const Hero = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",

  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "66%",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(6),

  [theme.breakpoints.up("md")]: {
    marginTop: "auto",
    marginBottom: "auto",
  },
})) as typeof Typography;

export const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  ...(theme.typography.h6 as any),
  fontWeight: "normal",

  [theme.breakpoints.up("md")]: {
    ...(theme.typography.h2 as any),
    fontWeight: "normal",
  },
})) as typeof Typography;

export const Caption = styled(Typography)(({ theme }) => ({
  ...(theme.typography.body2 as any),
  fontWeight: "lighter",

  [theme.breakpoints.up("md")]: {
    ...(theme.typography.subtitle1 as any),
    fontWeight: "lighter",
  },
})) as typeof Typography;

export const RightPane = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
