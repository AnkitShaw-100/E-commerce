import React from "react";
import { FiAward, FiTruck, FiShield, FiHeart, FiUsers, FiTrendingUp } from "react-icons/fi";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Our Story Section */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-20">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">Our Story</h2>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Founded with a vision to revolutionize online shopping, Apni Dukan was born from the idea that everyone deserves access to quality products at fair prices. We started as a small team with big dreams and have grown into a trusted platform serving thousands of customers.
                        </p>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Our journey began when we noticed the gap between customer expectations and what was available in the market. We decided to bridge that gap by curating products from trusted manufacturers and providing an exceptional shopping experience.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <FiHeart className="text-emerald-600 text-xl" />
                            </div>
                            <p className="text-gray-700 font-medium">Built with love for our customers</p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center mb-8 lg:mb-0">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                            alt="Our Journey - Team Working"
                            className="rounded-3xl shadow-2xl w-full max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 object-cover hover:shadow-3xl transition-shadow duration-300"
                        />
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="mb-16 lg:mb-20">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Our Values</h2>
                        <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
                            These core values guide everything we do and shape the way we serve our customers every day.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <FiAward className="text-emerald-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality First</h3>
                            <p className="text-gray-700 leading-relaxed">
                                We never compromise on quality. Every product is carefully selected and tested to meet our high standards.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <FiTruck className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Quick and reliable shipping to get your orders to you as fast as possible, without compromising safety.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                <FiShield className="text-purple-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Shopping</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Your privacy and security are our top priorities. Shop with confidence knowing your data is protected.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16 lg:mb-20">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Meet Our Team</h2>
                        <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
                            Behind Apni Dukan is a passionate team of professionals dedicated to making your shopping experience exceptional.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 mb-8 lg:mb-0">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                alt="Our Team Working Together"
                                className="rounded-3xl shadow-2xl w-full h-64 sm:h-80 object-cover mx-auto max-w-md lg:max-w-none"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiUsers className="text-emerald-600 text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                                    <p className="text-gray-700">Team Members</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiTrendingUp className="text-blue-600 text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                                    <p className="text-gray-700">Customer Support</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Our diverse team brings together expertise in technology, customer service, logistics, and product curation. We're united by our shared mission to provide you with the best possible shopping experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-slate-700 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">Our Mission</h2>
                    <p className="text-lg lg:text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-6 lg:mb-8 px-4">
                        To democratize access to quality products by creating a platform where customers can discover, explore, and purchase items they love with complete confidence and convenience.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-emerald-300 mb-2">10,000+</h3>
                            <p className="text-emerald-100">Happy Customers</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-emerald-300 mb-2">500+</h3>
                            <p className="text-emerald-100">Products Available</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-emerald-300 mb-2">99.9%</h3>
                            <p className="text-emerald-100">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
