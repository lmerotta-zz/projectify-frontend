import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const AppContainer = () => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    <AppBar position="static">
      <Toolbar>
        <Typography flexGrow={1} variant="h6" component="div">
          Projectify
        </Typography>
      </Toolbar>
    </AppBar>
    <Box component="main" flexGrow={1}>
      Main content
    </Box>
  </Box>
);
export default AppContainer;
