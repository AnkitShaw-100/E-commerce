import React from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiList } from "react-icons/fi";

const UserMenu = () => {
  return (
    <aside className="w-full md:w-64 bg-gray-900 text-white rounded-md p-4 sticky top-4">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase">
          Account
        </h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold">
            J
          </div>
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-400">john@example.com</div>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard/user"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FiUser className="w-5 h-5" />
          <span className="text-sm">Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FiList className="w-5 h-5" />
          <span className="text-sm">Orders</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserMenu;
