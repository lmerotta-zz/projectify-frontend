import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyles } from "twin.macro";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "apollo/client";
import "utils/i18n";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Suspense fallback={null}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
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
