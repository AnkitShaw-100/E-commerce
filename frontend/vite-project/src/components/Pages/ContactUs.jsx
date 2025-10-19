import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // If user is logged in, prefill name/email
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user?.name || user?.username || "",
        email: user?.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg({ type: "error", text: "Please fill in all fields" });
      return;
    }

    // EmailJS integration
    const SERVICE_ID = "service_rf8ls9o";
    const TEMPLATE_ID =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
    const PUBLIC_KEY =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";
    const TO_EMAIL =
      import.meta.env.VITE_EMAILJS_TO_EMAIL || "ankitshaw6999@gmail.com";

    setSending(true);
    setStatusMsg(null);

    try {
      const emailjs = await import("@emailjs/browser");

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        to_email: TO_EMAIL,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatusMsg({ type: "success", text: "Message sent. Thank you!" });
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        message: "",
      });
    } catch (err) {
      console.error("Email send failed", err);
      // If EmailJS returns a response-like error, show more details when available
      const errText =
        err?.text ||
        err?.message ||
        "Failed to send message. Please try again later.";
      setStatusMsg({
        type: "error",
        text: `Failed to send message: ${errText}`,
      });
    } finally {
      setSending(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  return (
    <div className="bg-gray-50 pt-16 sm:pt-20 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Fill out the form below and
            we'll get back to you shortly.
          </p>
        </div>

        {/* Single column: form only (aside removed) */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 items-stretch">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 border border-gray-100 h-full max-w-3xl mx-auto"
          >
            {/* top icon/header */}
            <div className="flex flex-col items-center text-center -mt-1">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-4 shadow-sm">
                <FaPaperPlane className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mt-2">
                Send us a message
              </h3>
              <p className="text-sm text-gray-500 mt-0">
                We aim to reply within 24 hours
              </p>
            </div>

            {statusMsg && (
              <div
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  statusMsg.type === "error"
                    ? "bg-red-100 text-red-800"
                    : "bg-emerald-50 text-emerald-800"
                }`}
              >
                {statusMsg.text}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required={!user}
                    readOnly={!!user}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:bg-slate-50 ${
                      user ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    required={!user}
                    readOnly={!!user}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:bg-slate-50 ${
                      user ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm sm:text-base"
                />
                <div className="absolute right-3 bottom-3 text-sm text-gray-400">
                  Max 1000
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className={`flex-1 inline-flex items-center justify-center gap-3 rounded-lg py-3 px-6 text-sm sm:text-base font-semibold shadow-lg text-white ${
                  sending
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                }`}
              >
                <FaPaperPlane />
                <span>{sending ? "Sending..." : "Send Message"}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    message: "",
                  })
                }
                className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
