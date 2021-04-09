import React from "react";
import { render } from "@testing-library/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({ key: "iodajdoiwanoawdni" });
cache.compat = true;

const AllTheProviders = ({ children }) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
