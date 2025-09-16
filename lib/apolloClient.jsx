import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://ap-south-1.cdn.hygraph.com/content/cmf9velgb01en0duoe8i257ko/master",
  }),

  cache: new InMemoryCache(),
});

export default client;
