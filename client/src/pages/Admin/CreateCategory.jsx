import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data && data.category) setCategories(data.category);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name },
        { withCredentials: true }
      );
      setMessage(data.message || "Category created");
      setName("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating category");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
    setMessage("");
    setError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${editId}`,
        { name: editName },
        { withCredentials: true }
      );
      setMessage(data.message || "Category updated");
      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Error updating category");
    }
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`,
        { withCredentials: true }
      );
      setMessage(data.message || "Category deleted");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting category");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Create Category</h2>
          <p className="text-sm text-gray-500 mt-1">Add a new category for your products.</p>
        </div>
      </div>

      <form
        onSubmit={editId ? handleEditSubmit : handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category name</label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
            placeholder="e.g. Clothing, Electronics"
            value={editId ? editName : name}
            onChange={(e) => (editId ? setEditName(e.target.value) : setName(e.target.value))}
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-95"
          >
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setEditName("");
              }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">All Categories</h3>
        {loading ? (
          <div className="text-sm text-gray-500 py-6">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-sm text-gray-500 py-6">No categories yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cat.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="mr-2 px-3 py-1 bg-black text-white rounded-md text-sm hover:opacity-95"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
