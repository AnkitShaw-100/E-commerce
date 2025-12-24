import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // Fetch categories for dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("/api/v1/category/get-category");
                if (data && data.category) setCategories(data.category);
            } catch (err) {
                // Optionally handle error
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const { data } = await axios.post(
                "/api/v1/product/create-product",
                { name, description, price, category, quantity, shipping },
                { withCredentials: true }
            );
            setMessage(data.message);
            setName("");
            setDescription("");
            setPrice("");
            setCategory("");
            setQuantity("");
            setShipping(false);
        } catch (err) {
            setError(err.response?.data?.message || "Error creating product");
        }
    };

    return (
        <div className="card w-100 p-4">
            <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>Create Product</h2>
            <p className="text-muted text-center">Add a new product to your store here.</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-100" style={{ maxWidth: 400 }}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Product Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    <select
                        className="form-control mb-2"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        required
                    />
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={shipping}
                            onChange={e => setShipping(e.target.checked)}
                            id="shippingCheck"
                        />
                        <label className="form-check-label" htmlFor="shippingCheck">
                            Shipping Available
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ background: '#222', border: 'none', fontWeight: 600, borderRadius: '8px', padding: '0.7rem 2.5rem' }}>
                    Create
                </button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default CreateProduct;
