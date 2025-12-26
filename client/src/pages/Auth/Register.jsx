import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [Answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...validation logic unchanged...
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        Answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecomm app">
      <div className="flex items-center justify-center min-h-[90vh]  px-4 font-poppins">
        <div className=" rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">
            Create Account
          </h1>
          <p className="text-center text-gray-600 text-base mb-6 font-normal leading-relaxed">
            Join us today and start shopping
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 w-full"
          >
            {/* Name */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1 w-full md:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            {/* Answer */}
            <div className="flex flex-col gap-1 w-full md:col-span-2">
              <label
                htmlFor="Answer"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Answer
              </label>
              <input
                id="Answer"
                type="text"
                value={Answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your pet name?"
                required
                className="px-3 py-3 border border-gray-300 rounded-md text-base font-poppins transition focus:outline-none focus:border-gray-900 focus:bg-white bg-gray-50 placeholder:text-gray-400"
              />
            </div>
            <div className="md:col-span-2 flex justify-center items-center mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-5 rounded-md text-base font-semibold cursor-pointer transition-all mt-2 uppercase tracking-wide shadow-md w-full hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                Register Now
              </button>
            </div>
          </form>
          <div className="text-center mt-6 text-base text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="text-gray-900 font-semibold ml-1 hover:text-gray-800 hover:underline transition"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
