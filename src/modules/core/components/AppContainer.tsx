import { Box } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";

type AppContainerProps = {
  children: ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => (
  <Box display="flex" minHeight="100vh">
    <Header />
    <Box component="main" flexGrow={1} mt={7} p={3}>
      {children}
    </Box>
  </Box>
);
export default AppContainer;
