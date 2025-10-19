import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMenuOpen(false);
    }
    catch (error) {
      console.error('Logout failed: ', error);
    }
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    ...(isAuthenticated ? [{ name: "My Profile", path: "/profile" }] : [])
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center select-none group cursor-pointer" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', fontWeight: 800 }}>
            <span className="text-emerald-600 group-hover:text-slate-700">Apni</span>
            <span className="ml-1 text-slate-700 group-hover:text-emerald-600">Dukan</span>
          </Link>

          {/* Desktop Nav (large screens) */}
          <div className="hidden lg:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-semibold text-gray-700 hover:text-emerald-600"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)', fontWeight: 600 }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Tablet Nav (medium screens) - compact inline links */}
          <div className="hidden md:flex lg:hidden items-center space-x-6">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-emerald-600"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)', fontWeight: 600 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side (Cart / Login-Logout / Mobile Menu) */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-emerald-600 hover:text-slate-700" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.4rem)' }}>
              <FiShoppingCart />
            </Link>

            {/* Show login/logout inline on md+ */}
            {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-slate-400 disabled:to-slate-500 disabled:transform-none disabled:hover:shadow-lg"
                  style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                >
                  <FiLogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg hidden md:inline-flex transform hover:-translate-y-0.5 transition-all duration-300"
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700 hover:text-emerald-600" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ fontSize: 'clamp(1.2rem, 2.6vw, 2rem)' }}>
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
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="font-semibold text-gray-700 hover:text-emerald-600" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)', fontWeight: 600 }} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <div className="text-center">
                <p className="text-gray-700 text-sm">Hi, {user?.name || 'User'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-slate-400 disabled:to-slate-500 disabled:transform-none disabled:hover:shadow-lg"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
