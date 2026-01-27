import React from "react";
import logo from "../../assets/images/logo3.png";
import { Link } from "react-router-dom";

function AdminNavBar() {
  return (
    <nav className="w-full bg-white/80 shadow-sm px-6 py-3 flex items-center justify-between h-[80px]">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="RentZone Logo" className="w-15 h-auto" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Rent<span className="text-accent">Zone</span>
        </h1>
      </div>

      {/* Navigation */}
      <ul className="flex items-center gap-4  font-medium text-lg">
        <li className="cursor-pointer hover:text-white transition">
          <Link to={"/admin"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:text-white transition">
          <Link to={"/admin/product"}>Products</Link>
        </li>
        <li className="cursor-pointer hover:text-white transition">
          <Link to={"/admin/order"}>Orders</Link>
        </li>
        <li className="cursor-pointer hover:text-white transition">
          <Link to={"/admin/user"}>Users</Link>
        </li>
      </ul>

    </nav>
  );
}

export default AdminNavBar;
