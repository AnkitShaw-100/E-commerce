import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.css';

const menuItems = [
  {
    to: "/dashboard/user/profile",
    label: "Profile",
    style: { background: '#222', color: '#fff', fontWeight: 600 }
  },
  {
    to: "/dashboard/user/orders",
    label: "Orders",
    style: { background: '#222', color: '#fff', fontWeight: 600 }
  }
];

const UserMenu = () => {
  return (
    <div className="user-menu text-center">
      <div className="list-group">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `list-group-item user-menu-tab${isActive ? ' active' : ''}`
            }
            style={item.style}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
