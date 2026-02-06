import React, { useContext } from "react";
import logo from "../../assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { sidebarContext } from "../../pages/customers/Dashboard";
 // adjust path if needed

function CustomerNavBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(sidebarContext);

  const toggleSidebar = () => { 
    setIsSidebarOpen(!isSidebarOpen);
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between h-[80px] relative z-100 ">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="RentZone Logo" className="w-15 h-auto" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Rent<span className="text-accent">Zone</span>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="items-center gap-4 font-medium text-md hidden sm:flex text-accent ">
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/product"}>Products</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/booking"}>Bookings</Link>
        </li>
        <li className="cursor-pointer hover:text-accent/60 transition">
          <Link to={"/profile"}>Profile</Link>
        </li>

        <button 
          className="bg-accent/20 pt-1 pb-1 px-4 text-sm text-accent rounded-md ml-2 hover:bg-accent/40 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </ul>

      {/* Mobile Hamburger */}
      <IoIosMenu 
        className="text-2xl sm:hidden cursor-pointer" 
        onClick={toggleSidebar} 
      />
    </nav>
  );
}

export default CustomerNavBar;
