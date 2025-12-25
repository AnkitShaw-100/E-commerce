import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import { useAuth } from "../../context/auth.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    // Form validation and submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation rules
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

        // If all validations pass, submit
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            console.log('Login Response:', res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify({
                    user: res.data.user,
                    token: res.data.token
                }));
                console.log('Navigating to home...');
                navigate('/');
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
        <Layout title="Login - Ecomm app">
            <div className="login">
                <div className="login-container">
                    <h1>Welcome Back</h1>
                    <p className="login-subtitle">Login to your account to continue shopping</p>

                    <form onSubmit={handleSubmit} className="login-form">
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

                        <button type="submit" className="login-btn">
                            Login Now
                        </button>
                    </form>

                    <div className="login-footer">

                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
