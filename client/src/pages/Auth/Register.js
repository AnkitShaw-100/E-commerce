import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import {toast} from 'react-toastify';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Form function
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, address, phone);
        toast.success('Register Successfully');
    }

    return (
        <Layout title="Register - Ecomm app">
            <div className="register">
                <h1>Register Page</h1>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
