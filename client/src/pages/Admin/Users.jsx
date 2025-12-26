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
        const token = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth")).token
          : "";
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

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Users</h2>
          <p className="text-base text-gray-500">
            List and manage all users here.
          </p>
        </div>
        <div className="text-babasese text-gray-600">Total: {users.length}</div>
      </div>

      {error && (
        <div className="mb-4 text- text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {(() => {
              const filtered = users;
              const totalPages = Math.max(
                1,
                Math.ceil(filtered.length / perPage)
              );
              const start = (currentPage - 1) * perPage;
              const pageItems = filtered.slice(start, start + perPage);

              if (filtered.length === 0) {
                return (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-base text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                );
              }

              return (
                <>
                  {pageItems.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-base font-semibold text-gray-800">
                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div className="text-base font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-base text-gray-600">
                        {user.address || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                        {user.role === 1 ? "Admin" : "User"}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                          >
                            Prev
                          </button>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === i + 1
                                  ? "bg-black text-white"
                                  : "bg-white border border-gray-200"
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
                            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
