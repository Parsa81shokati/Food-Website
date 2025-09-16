import Layout from "@/components/Layout/Layout";
import client from "@/lib/apolloClient";
import store from "@/redux-toolkit/app/store";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}
