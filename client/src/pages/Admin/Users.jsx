import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token || "";

        const { data } = await axios.get("/api/v1/auth/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data.users || []);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.max(1, Math.ceil(users.length / perPage));
  const start = (currentPage - 1) * perPage;
  const pageItems = users.slice(start, start + perPage);

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Users
          </h2>
          <p className="text-gray-500">List and manage all users</p>
        </div>
        <div className="text-gray-600">Total: {users.length}</div>
      </div>

      {error && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              pageItems.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.phone || "—"}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                    {user.address || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.role === 1 ? "Admin" : "User"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {pageItems.map((user) => (
          <div key={user._id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="text-sm">
                {user.role === 1 ? "Admin" : "User"}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>Phone: {user.phone || "—"}</p>
              <p className="truncate">Address: {user.address || "—"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {users.length > perPage && (
        <div className="mt-6 flex justify-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
