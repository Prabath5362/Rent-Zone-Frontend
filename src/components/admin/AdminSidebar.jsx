import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdProductionQuantityLimits,
  MdShoppingCart,
  MdPeople,
} from "react-icons/md";
import { sidebarContext } from "../../pages/admin/AdminDashboard";

function AdminSidebar() {
  const { isSidebarOpen } = useContext(sidebarContext);

  const navigate = useNavigate();
  return (
    <aside className={`w-[240px] min-h-screen bg-white shadow-md px-4 py-6  sm:hidden absolute right-0 top-0 min-h-full z-50 pt-[90px] ${isSidebarOpen ? "block" : "hidden"}`}>
      
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Admin Panel
      </h2>

      <ul className="flex flex-col gap-3 text-lg font-medium">
        <li className="hover:bg-gray-100 rounded-lg transition">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3"
          >
            <MdDashboard className="text-xl" />
            Dashboard
          </Link>
        </li>

        <li className="hover:bg-gray-100 rounded-lg transition">
          <Link
            to="/admin/product"
            className="flex items-center gap-3 px-4 py-3"
          >
            <MdProductionQuantityLimits className="text-xl" />
            Products
          </Link>
        </li>

        <li className="hover:bg-gray-100 rounded-lg transition">
          <Link
            to="/admin/order"
            className="flex items-center gap-3 px-4 py-3"
          >
            <MdShoppingCart className="text-xl" />
            Orders
          </Link>
        </li>

        <li className="hover:bg-gray-100 rounded-lg transition">
          <Link
            to="/admin/customer"
            className="flex items-center gap-3 px-4 py-3"
          >
            <MdPeople className="text-xl" />
            Users
          </Link>
        </li>

        <button className="bg-accent/20 pt-1 pb-1 p-4 text-sm text-accent rounded-mdhover:bg-accent/40 cursor-pointer transition-text duration-300" onClick={()=>{
          navigate("/login");
          localStorage.clear();
        }}>Logout</button>
      </ul>

    </aside>
  );
}

export default AdminSidebar;
