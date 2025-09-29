import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all fields");
            return;
        }

        // Simple alert for now - can be enhanced later
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you.<br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>Fill out the form below and we'll get back to you shortly.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 sm:space-y-6 border border-gray-100 order-2 lg:order-1"
                    >
                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your Message"
                                rows={5}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm sm:text-base"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full text-sm sm:text-base"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 order-1 lg:order-2">
                        {/* Image Section */}
                        <div className="relative mb-6 sm:mb-8">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                                alt="Customer Service - Contact Us"
                                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-40 sm:h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl sm:rounded-2xl"></div>
                            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                                <h3 className="text-base sm:text-lg font-bold">We're Here to Help!</h3>
                            </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Get in Touch</h2>
                        <div className="space-y-4 sm:space-y-5">
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2 flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 4.26c.067.036.149.036.22 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Email</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">ankitshaw6933@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2 flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Phone</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">+91 12345 67890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2 flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Address</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">Kolkata, West Bengal, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;