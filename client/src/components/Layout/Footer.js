import React from 'react'
import { NavLink } from 'react-router-dom';
import { Mail, HelpCircle, Truck, RotateCcw, Home, UserPlus, LogIn, ShoppingCart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5">
      <div className="container-fluid px-5">
        <div className="row mb-4 g-4">
          {/* About Section */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="fw-bold mb-3">Apni Dukan</h5>
            <p className="text-muted">
              Your one-stop online shopping destination for quality products and great deals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <Home size={18} className="text-white" />
                <NavLink to="/" className="footer-link">Home</NavLink>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <UserPlus size={18} className="text-white" />
                <NavLink to="/register" className="footer-link">Register</NavLink>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <LogIn size={18} className="text-white" />
                <NavLink to="/login" className="footer-link">Login</NavLink>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <ShoppingCart size={18} className="text-white" />
                <NavLink to="/cart" className="footer-link">Cart</NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="fw-bold mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <Mail size={18} className="text-white" />
                <a href="#contact" className="footer-link">Contact Us</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <HelpCircle size={18} className="text-white" />
                <a href="#faq" className="footer-link">FAQ</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Truck size={18} className="text-white" />
                <a href="#shipping" className="footer-link">Shipping Info</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <RotateCcw size={18} className="text-white" />
                <a href="#return" className="footer-link">Returns</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <Facebook size={18} className="text-white" />
                <a href="#facebook" className="footer-link">Facebook</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Twitter size={18} className="text-white" />
                <a href="#twitter" className="footer-link">Twitter</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Instagram size={18} className="text-white" />
                <a href="#instagram" className="footer-link">Instagram</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Linkedin size={18} className="text-white" />
                <a href="#linkedin" className="footer-link">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="bg-secondary" />

        {/* Bottom Footer */}
        <div className="row py-4 align-items-center">
          <div className="col-12 text-center">
            <p className="text-muted mb-3 mb-md-0">
              &copy; 2025 Apni Dukan. All rights reserved.
            </p>
            <p className="text-muted mb-0">
              <a href="#privacy" className="footer-link">Privacy Policy</a> |
              <a href="#terms" className="footer-link">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
