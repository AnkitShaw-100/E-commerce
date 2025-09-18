import React, { useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="text-2xl font-extrabold flex items-center select-none group cursor-pointer">
                        <span className="transition-colors duration-300 text-blue-700 group-hover:text-slate-700">
                            Apni
                        </span>
                        <span className="ml-1 transition-colors duration-300 text-slate-700 group-hover:text-blue-700">
                            Dukan
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="relative font-semibold text-gray-700 hover:text-blue-700 tracking-wide transition-colors duration-300 
                  after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-700 
                  after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                  hover:after:w-full hover:after:left-0"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side (Cart / Login) */}
                    <div className="flex items-center space-x-5">
                        <a
                            href="/cart"
                            className="text-blue-700 hover:text-slate-700 text-2xl transition-colors duration-300"
                        >
                            <FiShoppingCart />
                        </a>
                        <a
                            href="/login"
                            className="px-5 py-2 bg-blue-700 text-white rounded-full font-semibold shadow-sm transition-all duration-300 hover:bg-slate-700 hover:shadow-md"
                        >
                            Login
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-3xl text-gray-700 transition-colors duration-300 hover:text-blue-700"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <div className="flex flex-col items-center space-y-6 py-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="relative font-semibold text-gray-700 hover:text-blue-700 transition-colors duration-300 
                  after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-700 
                  after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                  hover:after:w-full hover:after:left-0"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Extra for mobile */}
                        <a
                            href="/login"
                            className="px-5 py-2 bg-blue-700 text-white rounded-full font-semibold shadow-sm transition-all duration-300 hover:bg-slate-700 hover:shadow-md"
                        >
                            Login
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
