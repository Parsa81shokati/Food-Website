import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const adminClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api-ap-south-1.hygraph.com/v2/cmf9velgb01en0duoe8i257ko/master",
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_MANAGEMENT_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default adminClient;
