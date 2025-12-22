import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminMenu.css';

const menuItems = [
    {
        to: "/dashboard/admin/create-category",
        label: "Create Category",
        style: { background: '#222', color: '#fff', fontWeight: 600 }
    },
    {
        to: "/dashboard/admin/create-product",
        label: "Create Product",
        style: { background: '#222', color: '#fff', fontWeight: 600 }
    },
    {
        to: "/dashboard/admin/users",
        label: "Users",
        style: { background: '#222', color: '#fff', fontWeight: 600 }
    }
];

const AdminMenu = () => {
    return (
        <div className="admin-menu text-center">
            <div className="list-group">
                {menuItems.map((item, idx) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `list-group-item admin-menu-tab${isActive ? ' active' : ''}`
                        }
                        style={item.style}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default AdminMenu;