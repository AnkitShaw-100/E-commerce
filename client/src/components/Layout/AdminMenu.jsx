import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/dashboard/admin",
    label: "Profile",
  },
  {
    to: "/dashboard/admin/create-category",
    label: "Create Category",
  },
  {
    to: "/dashboard/admin/create-product",
    label: "Create Product",
  },
  {
    to: "/dashboard/admin/new-products",
    label: "All Products",
  },
  {
    to: "/dashboard/admin/users",
    label: "Users",
  },
  {
    to: "/dashboard/admin/orders",
    label: "Orders",
  },
];

const AdminMenu = () => {
  return (
    <div className="mx-0 mb-8 mt-0 pt-6 pb-2 bg-white rounded-xl text-center">
      <div className="max-w-[260px]  rounded-lg overflow-hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) => {
              const base = `flex items-center gap-3 text-left text-[1.04rem] font-medium py-3 mb-2 rounded-lg transition-colors outline-none`;
              const activeClass = `bg-black text-white border-l-4 border-black`;
              const inactiveClass = `bg-white text-gray-800 border border-gray-200 hover:bg-gray-50`;
              return `${base} ${isActive ? activeClass : inactiveClass}`;
            }}
          >
            <span className="flex-shrink-0 w-2 h-6 rounded-md bg-transparent" />
            <span className="grow">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
