import React from 'react'
import { NavLink } from 'react-router-dom';
import { ShoppingCart, LayoutGrid, User } from 'lucide-react';
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
                                    className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white fw-bold' : 'text-white'}`}
                                    to="/categories"
                                >
                                    <LayoutGrid size={18} />
                                    Categories
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
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle text-white d-flex align-items-center gap-2 border-0 bg-transparent"
                                    id="accountDropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <User size={18} />
                                    Account
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="accountDropdown">
                                    <li>
                                        <NavLink className="dropdown-item" to="/register">Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/login">Login</NavLink>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header
