import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // Form validation and submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation rules
        if (!name || name.trim() === "") {
            toast.error("Name is required");
            return;
        }
        if (name.trim().length < 3) {
            toast.error("Name must be at least 3 characters");
            return;
        }
        if (name.trim().length > 50) {
            toast.error("Name must not exceed 50 characters");
            return;
        }

        if (!email || email.trim() === "") {
            toast.error("Email is required");
            return;
        }
        if (!email.includes("@")) {
            toast.error("Email must contain @");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!password || password.trim() === "") {
            toast.error("Password is required");
            return;
        }
        if (password.length < 9) {
            toast.error("Password must be at least 9 characters");
            return;
        }

        if (!phone || phone.trim() === "") {
            toast.error("Phone number is required");
            return;
        }
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Phone number must contain only numerical values");
            return;
        }
        if (phone.length < 10 || phone.length > 15) {
            toast.error("Phone number must be 10-15 digits");
            return;
        }

        if (!address || address.trim() === "") {
            toast.error("Address is required");
            return;
        }
        const addressRegex = /^[a-zA-Z\s,.-]+$/;
        if (!addressRegex.test(address)) {
            toast.error("Address must contain only letters and basic punctuation");
            return;
        }
        if (address.trim().length < 5) {
            toast.error("Address must be at least 5 characters");
            return;
        }
        if (address.trim().length > 100) {
            toast.error("Address must not exceed 100 characters");
            return;
        }

        // If all validations pass, submit
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address });
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => navigate('/login'), 2000);
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log('Error:', error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    // console.log(`${process.env.REACT_APP_API}`);
    return (
        <Layout title="Register - Ecomm app">
            <div className="register">
                <div className="register-container">
                    <h1>Create Account</h1>
                    <p className="register-subtitle">Join us today and start shopping</p>

                    <form onSubmit={handleSubmit} className="register-form">
                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        <button type="submit" className="register-btn">
                            Register Now
                        </button>
                    </form>

                    <div className="register-footer">
                        Already have an account? <a href="/login">Login here</a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
