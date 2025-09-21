import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-16 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Apni Dukan is committed to bringing you the best shopping experience with premium products, latest trends, and exceptional customer service.
                    </p>
                    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-emerald-600 to-slate-600 mx-auto rounded-full"></div>
                </div>

                {/* Our Story Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Founded with a vision to provide customers with a seamless and enjoyable shopping experience, Apni Dukan curates a wide range of products from trusted brands. We believe shopping should be easy, fun, and accessible to everyone.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our dedicated team works tirelessly to select high-quality products and offer them at competitive prices, ensuring that you get value along with convenience.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                            alt="Our Story - E-commerce Shopping"
                            className="rounded-3xl shadow-2xl w-full max-w-lg h-96 object-cover hover:shadow-3xl transition-shadow duration-300"
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AboutUs;
