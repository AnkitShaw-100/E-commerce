import React from "react";
import Layout from "../components/Layout/Layout";

const CartPage = () => {
  return (
    <Layout title={"Cart - E-commerce App"}>
      <div className="container mt-3">
        <h1 className="text-center">Cart</h1>
        <p className="text-center">Your shopping cart is currently empty.</p>
      </div>
    </Layout>
  );
};

export default CartPage;
