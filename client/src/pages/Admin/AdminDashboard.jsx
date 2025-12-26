import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import { useAuth } from "../../context/auth";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [auth] = useAuth();

  const [pages, setPages] = useState([
    {
      key: "users",
      name: "Users",
      route: "/dashboard/admin/users",
      desc: "List and manage users",
      count: 0,
    },
    {
      key: "products",
      name: "Products",
      route: "/dashboard/admin/products",
      desc: "List and edit products",
      count: 0,
    },
    {
      key: "categories",
      name: "Categories",
      route: "/dashboard/admin/categories",
      desc: "List and edit categories",
      count: 0,
    },
    {
      key: "create-product",
      name: "Create Product",
      route: "/dashboard/admin/create-product",
      desc: "Add new products to the catalog",
      count: null,
    },
    {
      key: "create-category",
      name: "Create Category",
      route: "/dashboard/admin/create-category",
      desc: "Add a new product category",
      count: null,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : "";
  }, []);

  return (
    <Layout title={"Admin Dashboard - Ecommerce App"}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left - Menu */}
          <div className="col-span-1">
            <div className="mb-4">
              <h2
                className="text-4xl font-bold text-gray-900 mb-3 cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/admin")}
              >
                Admin Dashboard
              </h2>
              <AdminMenu />
            </div>
          </div>

          {/* Right - Content */}
          <div className="col-span-1 lg:col-span-3">


            {/* Nested routes render here */}
            <div className="bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
