import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data && data.category) setCategories(data.category);
        } catch (err) {
            setError("Failed to fetch categories");
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
            setMessage(data.message);
            setName("");
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Error creating category");
        }
    };

    const handleEdit = (cat) => {
        setEditId(cat._id);
        setEditName(cat.name);
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
            setMessage(data.message);
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
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`, { withCredentials: true });
            setMessage(data.message);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || "Error deleting category");
        }
    };

    return (
        <div className="card w-100 p-4">
            <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>Create Category</h2>
            <p className="text-muted text-center">Add a new category for your products here.</p>
            <form onSubmit={editId ? handleEditSubmit : handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-100" style={{ maxWidth: 400 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        value={editId ? editName : name}
                        onChange={e => editId ? setEditName(e.target.value) : setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ background: '#222', border: 'none', fontWeight: 600, borderRadius: '8px', padding: '0.7rem 2.5rem' }}>
                    {editId ? 'Update' : 'Create'}
                </button>
                {editId && (
                    <button type="button" className="btn btn-secondary ms-2 mt-2" onClick={() => { setEditId(null); setEditName(""); }}>
                        Cancel
                    </button>
                )}
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <hr className="my-4" />
            <h4 className="mb-3">All Categories</h4>
            <ul className="list-group">
                {categories.map(cat => (
                    <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{cat.name}</span>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cat)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateCategory;
