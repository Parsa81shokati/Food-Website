import React from "react";

import Footer from "./Footer";
import Header from "./header/Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
