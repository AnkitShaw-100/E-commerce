import React from "react";
import { useAuth } from "../../context/auth";

const AdminDetails = () => {
  const [auth] = useAuth();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Admin Details</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Name</span>
          <span className="text-sm font-medium text-gray-900">{auth?.user?.name || "—"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Email</span>
          <span className="text-sm font-medium text-gray-900">{auth?.user?.email || "—"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Contact</span>
          <span className="text-sm font-medium text-gray-900">{auth?.user?.phone || "—"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Role</span>
          <span className="text-sm font-medium text-gray-900">{auth?.user?.role === 1 ? "Admin" : "User"}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
