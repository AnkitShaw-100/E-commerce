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
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 4;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.category) setCategories(data.category);
    } catch {
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

  const totalPages = Math.max(1, Math.ceil(categories.length / perPage));
  const start = (currentPage - 1) * perPage;
  const pageCategories = categories.slice(start, start + perPage);

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create Category</h2>
      <p className="text-sm text-gray-500 mb-6">Add a new category for your products.</p>

      {/* FORM */}
      <form
        onSubmit={editId ? handleEditSubmit : handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category name
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-black"
            placeholder="e.g. Clothing, Electronics"
            value={editId ? editName : name}
            onChange={(e) =>
              editId ? setEditName(e.target.value) : setName(e.target.value)
            }
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
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
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}

      <h3 className="text-lg font-medium text-gray-800 mb-3">All Categories</h3>

      {loading ? (
        <div className="text-sm text-gray-500">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-sm text-gray-500">No categories yet.</div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageCategories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{cat.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="mr-2 px-3 py-1 bg-black text-white rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="px-3 py-1 bg-gray-100 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-4">
            {pageCategories.map((cat) => (
              <div key={cat._id} className="border rounded-lg p-4">
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-gray-500 mb-3">
                  Created: {new Date(cat.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="flex-1 px-3 py-2 bg-black text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {categories.length > perPage && (
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
                      : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateCategory;
