import GlobalLoginModal from "@/components/auth/GlobalLoginModal";
import CartPersist from "@/features/cart/components/CartPersist";
import Layout from "@/components/Layout/Layout";
import AuthProvider from "@/features/auth/context/AuthContext";
import client from "@/lib/apollo/Client";
import store from "@/redux-toolkit/app/store";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthProvider>
          <CartPersist />
          <GlobalLoginModal />
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </Provider>
    </ApolloProvider>
  );
}
