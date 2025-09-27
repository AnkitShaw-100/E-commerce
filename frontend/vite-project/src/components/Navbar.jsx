import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold flex items-center select-none group cursor-pointer"
          >
            <span className="transition-colors duration-300 text-emerald-600 group-hover:text-slate-700">
              Apni
            </span>
            <span className="ml-1 transition-colors duration-300 text-slate-700 group-hover:text-emerald-600">
              Dukan
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative font-semibold text-gray-700 hover:text-emerald-600 tracking-wide transition-colors duration-300 
                after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 
                after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                hover:after:w-full hover:after:left-0"
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Search */}
            <div className="flex items-center bg-gray-200 rounded-xl px-4 py-2 max-w-md flex-1 ml-6">
              <FiSearch className="text-gray-600 mr-3" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Side (Cart / Login / Mobile Menu) */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-emerald-600 hover:text-slate-700 text-2xl transition-colors duration-300"
            >
              <FiShoppingCart />
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 hidden md:block"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-3xl text-gray-700 transition-colors duration-300 hover:text-emerald-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${menuOpen ? "max-h-screen py-6" : "max-h-0 overflow-hidden py-0"
          } bg-white shadow-lg border-t border-gray-200`}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 w-80 max-w-[90%]">
            <FiSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative font-semibold text-gray-700 hover:text-emerald-600 transition-colors duration-300 
              after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 
              after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
              hover:after:w-full hover:after:left-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            className="px-5 py-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
