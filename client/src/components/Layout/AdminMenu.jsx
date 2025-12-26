import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/dashboard/admin/create-category",
    label: "Create Category",
  },
  {
    to: "/dashboard/admin/create-product",
    label: "Create Product",
  },
  {
    to: "/dashboard/admin/users",
    label: "Users",
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
            className={({ isActive }) =>
              `flex items-center gap-3 text-left text-[1.04rem] font-medium  py-3 mb-2 rounded-lg transition-colors outline-none
               ${
                 isActive
                   ? "bg-black text-white  border-l-4 border-black"
                   : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
               }`
            }
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
