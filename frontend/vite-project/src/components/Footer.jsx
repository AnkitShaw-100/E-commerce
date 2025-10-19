import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiHeart,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="text-xl font-bold text-white">Apni Dukan</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination. We provide quality
              products with exceptional service, making your shopping experience
              seamless and enjoyable.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FiFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FiTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-emerald-500 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-emerald-500 pb-2">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Returns & Exchange
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-emerald-500 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMail size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a
                    href="mailto:ankitshaw6933@gmail.com"
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors duration-300"
                  >
                    ankitshaw6933@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a
                    href="tel:+911234567890"
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors duration-300"
                  >
                    +91 12345 67890
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMapPin size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-emerald-400 text-sm">
                    Kolkata, West Bengal
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h5 className="text-lg font-semibold text-white mb-1">
                Stay Updated
              </h5>
              <p className="text-gray-300 text-sm">
                Subscribe to get special offers, updates and new arrivals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-600 w-full sm:w-64"
              />
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 Apni Dukan. Made with</span>
              <FiHeart size={14} className="text-emerald-500" />
              <span>by Ankit Shaw</span>
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
