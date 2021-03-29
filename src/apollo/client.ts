import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import qs from "qs";

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

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  link: restLink,
});

export default client;
