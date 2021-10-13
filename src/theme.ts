import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material" {
  interface Palette {
    neutral: string;
  }

  interface PaletteOptions {
    neutral?: string;
  }
}

const theme = createTheme({
  palette: {
    neutral: grey[500],
    primary: {
      main: "rgb(147, 51, 234)",
    },
    secondary: {
      main: "rgb(234, 179, 8)",
    },
  },
});

export default theme;
