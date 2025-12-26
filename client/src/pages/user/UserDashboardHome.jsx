import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu";
import { Outlet } from "react-router-dom";
import axios from "axios";

const UserDashboardHome = () => {
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : "";
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/v1/order/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrdersCount((data.orders || []).length);
      } catch (err) {
        // ignore
      }
    };
    fetchOrders();
  }, []);

  const pages = [
    {
      name: "Profile",
      route: "/dashboard/user",
      desc: "View and edit profile",
      count: null,
    },
    {
      name: "Orders",
      route: "/dashboard/user/orders",
      desc: "Your order history",
      count: ordersCount,
    },
  ];

  return (
    <Layout title={"User Dashboard - Ecommerce App"}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="mb-4">
              <h2
                className="text-4xl font-bold text-gray-900 mb-3 cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/user")}
              >
                User Dashboard
              </h2>
              <UserMenu />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboardHome;
