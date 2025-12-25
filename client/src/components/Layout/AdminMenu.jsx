import { NavLink } from 'react-router-dom';

const menuItems = [
    {
        to: "/dashboard/admin/create-category",
        label: "Create Category"
    },
    {
        to: "/dashboard/admin/create-product",
        label: "Create Product"
    },
    {
        to: "/dashboard/admin/users",
        label: "Users"
    }
];

const AdminMenu = () => {
    return (
        <div className="mx-0 mb-8 mt-0 pt-6 pb-2 bg-gray-100 rounded-xl shadow-md text-center">
            <div className="max-w-[260px] mx-auto rounded-lg overflow-hidden bg-transparent">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `block text-left text-[1.08rem] font-semibold px-5 py-4 mb-2 rounded-lg border-0 shadow-sm transition-all outline-none
                            ${isActive
                                ? 'bg-black text-white shadow-lg z-10'
                                : 'bg-[#222] text-white hover:bg-black hover:text-white cursor-pointer'}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default AdminMenu;
