import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "@apollo/client/link/context";
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

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
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
        Authorization: `Bearer ${user.id_token}`,
      },
    };
  }

  return {
    headers,
  };
});

let locale = "";

i18next.on("languageChanged", (lng) => {
  locale = lng;
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    "x-locale": locale,
  },
  link: from([restLink, authLink.concat(httpLink)]),
});

export default client;
