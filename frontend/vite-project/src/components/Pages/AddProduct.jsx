import React, { useState } from "react";
import { productAPI } from "../../services/apiServices";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice(null);
    try {
      await productAPI.addProduct(form);
      setNotice({ type: "success", text: "Product added successfully!" });
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        stock: "",
      });
    } catch (err) {
      setNotice({
        type: "error",
        text: err?.message || "Failed to add product",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Add New Product
        </h2>
        {notice && (
          <div
            className={`mb-4 rounded px-4 py-2 text-sm font-medium ${
              notice.type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-emerald-50 text-emerald-800"
            }`}
          >
            {notice.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Product Name"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="Price"
            type="number"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            placeholder="Stock"
            type="number"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
