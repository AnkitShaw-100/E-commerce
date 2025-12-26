import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
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
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        Answer,
        newPassword,
      });
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
      <div className="flex items-center justify-center min-h-[90vh] px-4 font-poppins">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">Reset Password</h1>
          <p className="text-center text-gray-600 text-base mb-6 font-normal leading-relaxed">Enter the email, security answer and a new password to reset your account password.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-sm font-semibold text-gray-900 capitalize">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="py-3 px-4 border border-gray-300 rounded-md text-base transition-all bg-gray-50 w-full focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-md placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="Answer" className="text-sm font-semibold text-gray-900 capitalize">Security Answer</label>
              <input
                id="Answer"
                type="text"
                value={Answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your pet's name?"
                required
                className="py-3 px-4 border border-gray-300 rounded-md text-base transition-all bg-gray-50 w-full focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-md placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="newPassword" className="text-sm font-semibold text-gray-900 capitalize">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="py-3 px-4 border border-gray-300 rounded-md text-base transition-all bg-gray-50 w-full focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-md placeholder:text-gray-400"
              />
            </div>

            <button type="submit" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-5 rounded-md text-base font-semibold cursor-pointer transition-all mt-2 uppercase tracking-wide shadow-md w-full hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">Reset Password</button>
          </form>

          <div className="text-center mt-6 text-base text-gray-600">
            <a href="/login" className="text-gray-900 font-semibold transition-colors ml-1 hover:text-gray-800 hover:underline">Back to Login</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
