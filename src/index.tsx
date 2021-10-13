import { ApolloProvider } from "@apollo/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledEngineProvider } from "@mui/material/styles";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import client from "apollo/client";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "utils/i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://fa2fd408a3484083a4d963d8b5feb987@o560878.ingest.sentry.io/5696872",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 0,
});

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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Suspense fallback={null}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
