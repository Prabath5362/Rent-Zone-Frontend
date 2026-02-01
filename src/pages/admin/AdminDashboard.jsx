import React from "react";
import AdminNavBar from "../../components/admin/AdminNavBar";
import AdminHomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Dashboard from "../customers/Dashboard";
import ProductPage from "./product/ProductPage";
import OrdersPage from "./order/OrdersPage";
import CustomersPage from "./customer/CustomersPage";
import NotFoundPage from "./NotFoundPage";
import AddProductPage from "./product/AddProductPage";
import UpdateProductPage from "./product/UpdateProductPage";
import UpdateOrder from "./order/UpdateOrder";
import UpdateCustomer from "./customer/UpdateCustomer";

function AdminDashboard() {
  return (
    <div className="min-h-screen w-full">
      <AdminNavBar />

      <div className="min-h-[calc(100vh-80px)] w-full ">


          <Routes>
          <Route path="/" element={<AdminHomePage />} />


          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/add" element={<AddProductPage />} />
          <Route path="/product/update" element={<UpdateProductPage />} />


          <Route path="/order" element={<OrdersPage />} />
          <Route path="/order/update"element={<UpdateOrder />} />
        
        
          <Route path="/customer" element={<CustomersPage />} />
          <Route path="/customer/update" element={<UpdateCustomer />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
        
      
    </div>
  );
}

export default AdminDashboard;
