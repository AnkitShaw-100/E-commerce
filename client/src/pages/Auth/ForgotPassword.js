import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [Answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!Answer || Answer.trim().length < 2) {
      toast.error("Answer must be at least 2 characters");
      return;
    }
    if (!newPassword || newPassword.length < 9) {
      toast.error("New password must be at least 9 characters");
      return;
    }

    try {
      const res = await axios.post(
        '/api/v1/auth/forgot-password',
        { email, Answer, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Password reset successfully");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(res.data.message || "Unable to reset password");
      }
    } catch (error) {
      console.log("Forgot Password Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title="Forgot Password - Ecomm app">
      <div className="login">
        <div className="login-container">
          <h1>Reset Your Password</h1>
          <p className="login-subtitle">
            Enter your account email, your security answer, and a new password
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Answer">Answer</label>
              <input
                id="Answer"
                type="text"
                value={Answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your pet name?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
