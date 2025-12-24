import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
        } catch (err) {
            setError(err.response?.data?.message || "Error creating category");
        }
    };

    return (
        <div className="card w-100 p-4">
            <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>Create Category</h2>
            <p className="text-muted text-center">Add a new category for your products here.</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-100" style={{ maxWidth: 400 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
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

export default CreateCategory;
