import { Box, CircularProgress, styled } from "@mui/material";
import { ReactNode, Suspense } from "react";
import Header from "./Header";

type AppContainerProps = {
  children: ReactNode;
};

const XES = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  marginTop: "128px",
}));

const Test = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const AppContainer = ({ children }: AppContainerProps) => (
  <Test minHeight="100vh" display="flex">
    <Header />
    <XES component="main" flexGrow={1} display="flex">
      <Suspense fallback={<CircularProgress variant="indeterminate" />}>
        {children}
      </Suspense>
    </XES>
  </Test>
);
export default AppContainer;
