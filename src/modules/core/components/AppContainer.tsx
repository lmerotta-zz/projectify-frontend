import { Box, Typography } from "@mui/material";
import { Route, Routes } from "react-router";
import Header from "./Header";

const AppContainer = () => (
  <Box display="flex" minHeight="100vh">
    <Header />
    <Box component="main" flexGrow={1} mt={7} p={3}>
      <Routes>
        <Route path="/" element={<Typography>Hello</Typography>} />
        <Route path="*" element={<Typography>Notfound</Typography>} />
      </Routes>
    </Box>
  </Box>
);
export default AppContainer;
