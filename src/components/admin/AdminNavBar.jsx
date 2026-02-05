import React, { useContext } from "react";
import logo from "../../assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { sidebarContext } from "../../pages/admin/AdminDashboard";

function AdminNavBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(sidebarContext);

  const toggleSidebar = () => { 
    setIsSidebarOpen(!isSidebarOpen);
  }

  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between h-[80px] relative z-100">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="RentZone Logo" className="w-15 h-auto" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Rent<span className="text-accent">Zone</span>
        </h1>
      </div>

      {/* Navigation */}
      <ul className=" items-center gap-4  font-medium text-lg hidden sm:flex text-accent ">
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/admin"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/admin/product"}>Products</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/admin/order"}>Orders</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/admin/customer"}>Users</Link>
        </li>

        <button className="bg-accent/20 pt-1 pb-1 p-4 text-sm text-accent rounded-md ml-8 hover:bg-accent/40 cursor-pointer transition-text duration-300" onClick={()=>{
          navigate("/login");
          localStorage.clear();
        }}>Logout</button>
      </ul>

      

      <IoIosMenu className="text-2xl sm:hidden cursor-pointer" onClick={toggleSidebar} />

    </nav>
  );
}

export default AdminNavBar;
