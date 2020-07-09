import React from "react";
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
