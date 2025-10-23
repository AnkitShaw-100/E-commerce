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
                    ankitshaw6999@gmail.com
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
