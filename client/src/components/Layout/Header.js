import React from 'react'
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid px-4">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        Apni-Dukan
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active text-white fw-bold' : 'text-white'}`}
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active text-white fw-bold' : 'text-white'}`}
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active text-white fw-bold' : 'text-white'}`}
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white fw-bold' : 'text-white'}`}
                                    to="/cart"
                                >
                                    <ShoppingCart size={20} />
                                    Cart
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header
