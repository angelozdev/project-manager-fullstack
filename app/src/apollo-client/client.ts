import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://project-manager-server.vercel.app/",
  connectToDevTools: true,
});

export default client;
