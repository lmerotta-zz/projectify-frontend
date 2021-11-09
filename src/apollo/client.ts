import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { RestLink } from "apollo-link-rest";
import { createUploadLink } from "apollo-upload-client";
import i18next from "i18next";
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: relayStylePagination(),
        },
      },
    },
  }),
  link: from([restLink, authLink.concat(httpLink)]),
});

export default client;
