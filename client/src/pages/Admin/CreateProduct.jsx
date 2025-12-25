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

  // Fetch categories and products on mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(data.category);
      setCategories(data.category || []);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to load products");
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
      setMessage(data.message);
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
      shipping: prod.shipping,
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
      setMessage(data.message);
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
      setMessage(data.message);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
    }
  };
  console.log("products", products);

  const getImageUrl = (photo) => {
    if (!photo || !photo.data || !photo.data.data) return "";
    const uint8Array = new Uint8Array(photo.data.data);
    const blob = new Blob([uint8Array], {
      type: photo.contentType,
    });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  return (
    <div className="card w-100 p-4">
      <h2 className="mb-4 text-center fw-bold" style={{ color: "#222" }}>
        Create Product
      </h2>
      <p className="text-muted text-center">
        Add a new product to your store here.
      </p>
      <form
        onSubmit={editId ? handleEditSubmit : handleSubmit}
        className="d-flex flex-column align-items-center"
      >
        <div className="mb-3 w-100" style={{ maxWidth: 400 }}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            name="name"
            value={editId ? editProduct.name : name}
            onChange={
              editId ? handleEditChange : (e) => setName(e.target.value)
            }
            required
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            name="description"
            value={editId ? editProduct.description : description}
            onChange={
              editId ? handleEditChange : (e) => setDescription(e.target.value)
            }
            required
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            name="price"
            value={editId ? editProduct.price : price}
            onChange={
              editId ? handleEditChange : (e) => setPrice(e.target.value)
            }
            required
          />
          <select
            className="form-control mb-2"
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
            className="form-control mb-2"
            placeholder="Quantity"
            name="quantity"
            value={editId ? editProduct.quantity : quantity}
            onChange={
              editId ? handleEditChange : (e) => setQuantity(e.target.value)
            }
            required
          />
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: 8, borderRadius: 8 }}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            background: "#222",
            border: "none",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "0.7rem 2.5rem",
          }}
        >
          {editId ? "Update" : "Create"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2 mt-2"
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
          >
            Cancel
          </button>
        )}
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <hr className="my-4" />
      <h4 className="mb-3">All Products</h4>
      <div className="row g-4">
        {products.map((prod) => (
          <div key={prod._id} className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm">
              {prod._id && (
                <img
                  src={getImageUrl(prod.photo)}
                  alt={prod.name}
                  className="card-img-top"
                  style={{
                    objectFit: "cover",
                    height: "220px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x220?text=No+Image";
                  }}
                />
              )}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold mb-2">{prod.name}</h5>
                  <p className="card-text mb-1">{prod.category?.name || "-"}</p>
                  <p className="card-text small mb-2">{prod.description}</p>
                </div>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning flex-fill"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger flex-fill"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProduct;
