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
        // You can integrate API or email service here
        alert(`Thank you, ${formData.name}! We received your message.`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you.<br />
                        Fill out the form below and we'll get back to you shortly.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl shadow-xl p-10 space-y-7 border border-gray-100"
                    >
                        <div>
                            <label className="block text-gray-800 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-800 font-semibold mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your Message"
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                        {/* Image Section */}
                        <div className="relative mb-8">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                                alt="Customer Service - Contact Us"
                                className="rounded-2xl shadow-lg w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-lg font-bold">We're Here to Help!</h3>
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 4.26c.067.036.149.036.22 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600 text-sm">support@apnidukan.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600 text-sm">+91 12345 67890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Address</h3>
                                    <p className="text-gray-600 text-sm">Mumbai, Maharashtra, India</p>
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
