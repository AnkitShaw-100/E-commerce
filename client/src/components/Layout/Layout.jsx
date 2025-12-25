import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 min-h-[90vh] px-2 sm:px-4 md:px-8 py-4">
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
