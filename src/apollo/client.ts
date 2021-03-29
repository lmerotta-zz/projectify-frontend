import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import qs from "qs";
import i18next from "i18next";

const restLink = new RestLink({
  endpoints: {
    login: {
      uri: `${process.env.REACT_APP_ACTIONS_URL}security/authentication/login`,
    },
    authorize: {
      uri: `${process.env.REACT_APP_ACTIONS_URL}security/authentication/authorize`,
      responseTransformer: (response: Response) => {
        const url = response.url;
        const decoded = qs.parse(url.slice(url.lastIndexOf("?") + 1));
        return {
          code: decoded.code,
        };
      },
    },
  },
  credentials: "include",
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
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
  link: from([restLink, httpLink]),
});

export default client;
