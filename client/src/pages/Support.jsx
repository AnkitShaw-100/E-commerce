import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const Support = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Order",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/v1/support", form);
      toast.success("Support request sent — we'll reply soon.");
      setForm({ name: "", email: "", category: "Order", message: "" });
    } catch (err) {
      toast.error("Could not send request. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Support
                  </h1>
                  <p className="text-lg text-gray-700">
                    We’re here to help — open a support request below.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium text-gray-700">
                      Name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium text-gray-700">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-base font-medium text-gray-700">
                    Category
                  </span>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option>Order</option>
                    <option>Shipping</option>
                    <option>Returns</option>
                    <option>Technical</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-base font-medium text-gray-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Describe your issue"
                  />
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-60 transition"
                  >
                    {loading ? "Sending..." : "Send Request"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        name: "",
                        email: "",
                        category: "Order",
                        message: "",
                      })
                    }
                    className="text-base text-gray-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </main>

          <aside className="w-full lg:w-96">
            <div className="rounded-xl p-6 shadow-xl flex flex-col gap-6 h-full">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Support Hours
                  </h3>
                  <p className="text-lg text-gray-500">
                    Mon–Fri, 9am–6pm (local time)
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-white">
                <h4 className="text-lg font-semibold text-gray-700">
                  Quick Links
                </h4>
                <ul className="mt-2 text-base text-gray-600 space-y-2">
                  <li>
                    <a href="/faqs" className="hover:underline">
                      Help Center / FAQs
                    </a>
                  </li>
                  <li>
                    <a href="/return-refund" className="hover:underline">
                      Returns & Refunds
                    </a>
                  </li>
                  <li>
                    <a href="/shipping-policy" className="hover:underline">
                      Shipping Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                <div className="font-medium text-gray-800">Email</div>
                <a
                  href="mailto:ankitshaw6933@gmail.com"
                  className="block w-full text-center mt-3 text-base text-gray-600 hover:underline"
                >
                  ankitshaw6933@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
