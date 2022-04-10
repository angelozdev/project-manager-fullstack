import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { reloadAsync } from "expo-updates";
import { secureStoreUtils } from "@utils";
import { SecureStoreItems } from "@consts";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === "jwt expired") {
        secureStoreUtils.deleteItem(SecureStoreItems.USER);
        reloadAsync();
      }
      console.error(`[GraphQL error]: Message: ${message}`);
    });
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const withAccessToken = setContext(async (_, { headers }) => {
  const userFromSS = await secureStoreUtils.getItem<IUser>(
    SecureStoreItems.USER
  );
  if (!userFromSS) return { headers };
  const { accessToken } = userFromSS;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://192.168.0.12:4000/",
  // uri: "https://project-manager-server.vercel.app/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([withAccessToken, errorLink, httpLink]),
});

export default client;
