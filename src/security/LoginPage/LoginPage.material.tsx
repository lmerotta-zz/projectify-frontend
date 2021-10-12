import {
  Grid,
  Typography,
  Box,
  TextField,
  Link,
  Button,
  Divider,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import background from "../images/background.svg";

const LoginPage = () => {
  return (
    <Grid container sx={{ minHeight: "100vh" }} spacing={0}>
      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="center"
        flexShrink={1}
        py={7}
        px={4}
        sx={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
      >
        <Box display="flex" justifyContent="center" mb={6}>
          <Typography
            variant="h4"
            component="h2"
            color="white"
            sx={{ fontWeight: "bold" }}
          >
            ProjectifyTmp
          </Typography>
        </Box>
        <Typography
          color="white"
          variant="h6"
          component="h4"
          mb={1}
          sx={{ fontWeight: "normal" }}
        >
          Your{" "}
          <Typography color="secondary" component="span" variant="h6">
            projects
          </Typography>
          , your way
        </Typography>
        <Typography
          color="white"
          variant="body2"
          sx={{ fontWeight: "lighter" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          quis nunc a mauris faucibus aliquet. Nullam sed
        </Typography>
      </Grid>
      <Grid item xs={12} flexGrow={1} p={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "medium" }}>
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          component="h3"
          color={grey[500]}
          sx={{ fontWeight: "medium" }}
        >
          Log in to access your projects
        </Typography>
        <Box component="form" my={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField id="email" label="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                label="Password"
                fullWidth
              />
              <Link
                display="block"
                mt={2}
                href="#"
                underline="hover"
                variant="body2"
                color={grey[500]}
              >
                Forgot password ?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                size="large"
              >
                Log in
              </Button>
              <Typography
                mt={2}
                color={grey[500]}
                variant="body2"
                sx={{ fontWeight: "medium" }}
              >
                Don't have an account?{" "}
                <Link
                  href="#"
                  color="secondary"
                  underline="hover"
                  variant="inherit"
                >
                  Register here
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography color={grey[500]}>Or</Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                startIcon={<GitHub />}
              >
                Login with GitHub
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
