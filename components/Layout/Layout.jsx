import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="pt-30">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
