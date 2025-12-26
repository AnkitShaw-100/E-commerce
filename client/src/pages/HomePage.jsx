import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import h1 from "../pages/banner_image/h1.jpg";
import h2 from "../pages/banner_image/h2.jpg";

const HomePage = () => {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#222] leading-tight">
              Shop Smarter. <br /> Live Better.
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Discover premium products, unbeatable deals, and a seamless shopping
              experience — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/shop"
                className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/faq"
                className="px-6 py-3 border border-black text-black rounded-md text-sm font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src={h1}
              alt="Shopping"
              className="rounded-xl shadow-lg object-cover w-full h-[420px]"
            />
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className=" py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#222] mb-12">
            Why Shop With Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-[#222] mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Handpicked products that meet the highest quality standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-[#222] mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Reliable and quick delivery right to your doorstep.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-[#222] mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600 text-sm">
                Your transactions are protected with top-grade security.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={h2}
              alt="Products"
              className="w-full h-[350px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold">
                Designed for Modern Shoppers
              </h2>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;
