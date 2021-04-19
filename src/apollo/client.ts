import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "@apollo/client/link/context";
import i18next from "i18next";
import { createUploadLink } from "apollo-upload-client";
import AuthManager from "utils/AuthManager";
import { isAuthenticated } from "./local-state";

const restLink = new RestLink({
  endpoints: {
    login: {
      uri: `${process.env.REACT_APP_ACTIONS_URL}/login`,
    },
  },
  credentials: "include",
});

let locale = "";

i18next.on("languageChanged", (lng) => {
  locale = lng;
});

const authLink = setContext(async () => {
  const headers = {
    "x-locale": locale,
  };

  if (!isAuthenticated()) {
    return;
  }
  let user = await AuthManager.getUser();
  if (user === null || user.expired) {
    try {
      user = await AuthManager.isLoggedIn();
    } catch (e) {
      user = null;
    }
  }
  if (user !== null) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user.access_token}`,
      },
    };
  }

  return {
    headers,
  };
});

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([restLink, authLink.concat(httpLink)]),
});

export default client;
