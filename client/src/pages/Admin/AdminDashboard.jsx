import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout title={"Admin Dashboard - Ecommerce App"}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left - Admin Menu */}
          <div className="col-span-1">
            <div className="mb-4">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 cursor-pointer"
                onClick={() => (window.location.href = "/dashboard/admin")}
              >
                Admin Dashboard
              </h2>
              <AdminMenu />
            </div>
          </div>

          {/* Right - Content */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white p-4 md:p-6 ">
              {/* Nested routes render here */}
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
