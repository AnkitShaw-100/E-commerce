import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { orderAPI, userAPI } from "../../services/apiServices";

// small notice
const Notice = ({ type = "info", children }) => (
  <div
    className={`rounded-md px-4 py-2 text-sm font-medium ${
      type === "error"
        ? "bg-red-100 text-red-800"
        : "bg-emerald-50 text-emerald-800"
    }`}
  >
    {children}
  </div>
);

const MyProfile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Guest",
    email: "",
    phone: "",
    address: "",
  });

  const [editForm, setEditForm] = useState(profile);
  const [notice, setNotice] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    // Fetch profile from backend
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        const serverUser = res.user || {};
        setProfile((p) => ({
          ...p,
          name: serverUser.name || p.name,
          email: serverUser.email || p.email,
          phone: serverUser.phone || p.phone,
          address: serverUser.address || p.address,
        }));
        setEditForm((f) => ({
          ...f,
          name: serverUser.name || f.name,
          email: serverUser.email || f.email,
          phone: serverUser.phone || f.phone,
          address: serverUser.address || f.address,
        }));
      } catch {
        console.warn("Could not fetch profile from server");
      }
    };

    // fetch user's orders
    const fetchOrders = async () => {
      if (!user) return;
      setOrdersLoading(true);
      try {
        const data = await orderAPI.getUserOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchProfile();
    fetchOrders();
  }, [user]);

  const handleEdit = () => {
    // When opening edit form, seed the form with profile values and ensure email shows the default stored email
    setEditForm({
      ...profile,
      email: profile.email || user?.email || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Only name (username) is required — email cannot be changed here
    if (!editForm.name) {
      setNotice({ type: "error", text: "Name is required" });
      setTimeout(() => setNotice(null), 3000);
      return;
    }
    // send update to backend and update context
    (async () => {
      try {
        const payload = {
          name: editForm.name,
          // email is not editable from profile page
          phone: editForm.phone,
          address: editForm.address,
        };
        const res = await userAPI.updateProfile(payload);
        const updated = res.user || {};
        setProfile((p) => ({ ...p, ...updated }));
        setIsEditing(false);

        // update auth context and localStorage
        try {
          login(updated, localStorage.getItem("token"));
        } catch {
          // fallback: set local storage directly
          localStorage.setItem("user", JSON.stringify(updated));
        }

        setNotice({ type: "success", text: "Profile updated successfully" });
      } catch (err) {
        console.error("Failed to update profile", err);
        setNotice({
          type: "error",
          text: err?.message || "Failed to update profile",
        });
      } finally {
        setTimeout(() => setNotice(null), 3000);
      }
    })();
  };

  // derive initials for avatar
  const initials = (profile.name || user?.name || "U")
    .split(" ")
    .map((p) => p?.[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {notice && (
          <div className="mb-4">
            <Notice type={notice.type}>{notice.text}</Notice>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_28px_rgba(16,24,40,0.08)] border border-gray-100 overflow-hidden">
          <div className="relative">
            <div className="absolute -top-3 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-t-xl" />
          </div>
          <div className="px-7 sm:px-10 py-7 sm:py-9">
            <div className="flex items-start justify-between mb-6 gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl">
                  {initials}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {profile.name || user?.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {profile.email || user?.email}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition"
                  >
                    <FiEdit2 size={16} /> Complete details
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-md font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition"
                    >
                      <FiSave size={16} /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-md font-medium hover:bg-gray-50"
                    >
                      <FiX size={16} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="pt-1 text-emerald-600">
                    <FiUser />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                        {profile.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="pt-1 text-emerald-600">
                    <FiMail />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </h3>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        readOnly
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                        {profile.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="pt-1 text-emerald-600">
                    <FiPhone />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </h3>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                        {profile.phone || "Not provided"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="pt-1 text-emerald-600">
                    <FiMapPin />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-md text-gray-900">
                        {profile.address || "Not provided"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  Your Orders
                </h4>
                <div className="space-y-3">
                  {ordersLoading ? (
                    <div className="text-sm text-gray-500">
                      Loading orders...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-sm text-gray-500">
                      You have no orders yet.
                    </div>
                  ) : (
                    orders.map((o) => (
                      <div
                        key={o._id}
                        className="bg-white border border-gray-100 rounded-md p-3.5 shadow-sm flex items-center justify-between hover:shadow-md transform hover:-translate-y-1 transition"
                      >
                        <div className="min-w-0 pr-4">
                          <div className="text-sm font-semibold text-gray-800 truncate">
                            Order{" "}
                            <span className="font-mono text-xs text-gray-500">
                              #{String(o._id).slice(0, 8)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(o.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-700">
                            {o.orderItems?.length || 0} items
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{o.totalPrice}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
