import { Box, CircularProgress, styled } from "@mui/material";
import { ReactNode, Suspense } from "react";
import Header from "./Header";

type AppContainerProps = {
  children: ReactNode;
};

const XES = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const AppContainer = ({ children }: AppContainerProps) => (
  <Box display="flex" minHeight="100vh">
    <Header />
    <XES component="main" flexGrow={1} mt={7} p={3}>
      <Suspense fallback={<CircularProgress variant="indeterminate" />}>
        {children}
      </Suspense>
    </XES>
  </Box>
);
export default AppContainer;
