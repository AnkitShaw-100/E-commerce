import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: false,
  });
  const [loading, setLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  // Fetch categories and products on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data.category || []);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      if (photo) formData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(data.message || "Product created");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setQuantity("");
      setShipping(false);
      setPhoto(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setEditProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: prod.category?._id || prod.category,
      quantity: prod.quantity,
      shipping: !!prod.shipping,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      Object.entries(editProduct).forEach(([key, val]) =>
        formData.append(key, val)
      );
      if (photo) formData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${editId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(data.message || "Product updated");
      setEditId(null);
      setEditProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        shipping: false,
      });
      setPhoto(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
    }
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`,
        { withCredentials: true }
      );
      setMessage(data.message || "Product deleted");
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
    }
  };

  const getImageUrl = (photo) => {
    if (!photo || !photo.data || !photo.data.data) return "";
    const uint8Array = new Uint8Array(photo.data.data);
    const blob = new Blob([uint8Array], {
      type: photo.contentType,
    });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  // pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage) || 1;

  return (
    <div className="bg-white rounded-xl  p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Product
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Add or edit products for your store.
          </p>
        </div>
      </div>

      <form
        onSubmit={editId ? handleEditSubmit : handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6"
      >
        <div className="lg:col-span-2 grid grid-cols-1 gap-3">
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
            placeholder="Product Name"
            name="name"
            value={editId ? editProduct.name : name}
            onChange={
              editId ? handleEditChange : (e) => setName(e.target.value)
            }
            required
          />

          <textarea
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
            placeholder="Description"
            name="description"
            value={editId ? editProduct.description : description}
            onChange={
              editId ? handleEditChange : (e) => setDescription(e.target.value)
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              placeholder="Price"
              name="price"
              value={editId ? editProduct.price : price}
              onChange={
                editId ? handleEditChange : (e) => setPrice(e.target.value)
              }
              required
            />

            <select
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              name="category"
              value={editId ? editProduct.category : category}
              onChange={
                editId ? handleEditChange : (e) => setCategory(e.target.value)
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              placeholder="Quantity"
              name="quantity"
              value={editId ? editProduct.quantity : quantity}
              onChange={
                editId ? handleEditChange : (e) => setQuantity(e.target.value)
              }
              required
            />
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="shipping"
              checked={editId ? editProduct.shipping : shipping}
              onChange={
                editId ? handleEditChange : (e) => setShipping(e.target.checked)
              }
              className="w-4 h-4 text-black"
            />
            <span className="text-sm text-gray-700">Shipping Available</span>
          </label>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="mt-2 rounded-md max-h-40"
              />
            )}
            {/* Actions placed under file input as requested */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg font-medium"
              >
                {editId ? "Update" : "Create"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setEditProduct({
                      name: "",
                      description: "",
                      price: "",
                      category: "",
                      quantity: "",
                      shipping: false,
                    });
                    setPhoto(null);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>

            {message && (
              <div className="mt-3 text-sm text-green-700 bg-green-50 p-3 rounded">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-3 text-sm text-red-700 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* right column left minimal; actions moved to bottom */}
        </div>
      </form>

      <hr className="my-6" />

      <h4 className="mb-4 text-lg font-medium text-gray-800">All Products</h4>

      {loading ? (
        <div className="py-8 text-center text-sm text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          No products yet.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {prod._id && (
                  <img
                    src={getImageUrl(prod.photo)}
                    alt={prod.name}
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900">
                        {prod.name}
                      </h5>
                      <p className="text-xs text-gray-500">
                        {prod.category?.name || "-"}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="flex-1 px-3 py-2 bg-black text-white rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {products.length > productsPerPage && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
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
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
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

export default CreateProduct;
