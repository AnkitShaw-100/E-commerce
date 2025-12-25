import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

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
    <div className="card w-100 p-4">
      <h2 className="mb-4 text-center fw-bold" style={{ color: "#222" }}>
        Users
      </h2>
      <p className="text-muted text-center">List and manage all users here.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role === 1 ? "Admin" : "User"}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
