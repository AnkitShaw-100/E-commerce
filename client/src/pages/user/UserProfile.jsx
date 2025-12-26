import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const UserProfile = () => {
  const [auth] = useAuth();
  const user = auth?.user || {};
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const [ordersCount, setOrdersCount] = useState(null);
  const [totalSpent, setTotalSpent] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth")).token
          : "";
        const { data } = await axios.get("/api/v1/order/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data?.success) {
          const orders = data.orders || [];
          setOrdersCount(orders.length);
          const total = orders.reduce(
            (s, o) => s + (parseFloat(o.total) || 0),
            0
          );
          setTotalSpent(total);
        }
      } catch (err) {
        console.error("Failed fetching user orders", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchUserOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl  p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar / Sidebar */}
        <div className="md:w-44 w-full flex-shrink-0">
          <div className="flex md:flex-col items-center gap-4 md:gap-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-800">
              {initial}
            </div>

            <div className="md:mt-3 text-center">
              <div className="text-lg font-semibold text-gray-900">
                {user.name || "—"}
              </div>
              <span
                className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 1
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role === 1 ? "Admin" : "User"}
              </span>
            </div>
          </div>

          <button className="mt-4 w-full px-3 py-2 bg-black text-white rounded-md text-sm">
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center md:text-left">
            Profile Details
          </h3>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Email" value={user.email} />
            <Info label="Contact" value={user.phone} />
            <Info label="Address" value={user.address} />
            <Info
              label="Member Since"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"
              }
            />
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat
              label="Orders"
              value={loadingStats ? "—" : ordersCount}
            />
            <Stat
              label="Total Spent"
              value={
                loadingStats
                  ? "—"
                  : `₹${(totalSpent || 0).toFixed(2)}`
              }
            />
            <Stat
              label="Last Login"
              value={
                user.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "—"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="mt-1 text-sm font-medium text-gray-900">
      {value || "—"}
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="p-4 border rounded-lg text-center">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="mt-1 text-lg font-semibold text-gray-900">
      {value}
    </div>
  </div>
);

export default UserProfile;
