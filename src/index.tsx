import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyles } from "twin.macro";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "apollo/client";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "react-toastify/dist/ReactToastify.css";
import "utils/i18n";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

Sentry.init({
  dsn:
    "https://fa2fd408a3484083a4d963d8b5feb987@o560878.ingest.sentry.io/5696872",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 0,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Suspense fallback={null}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
