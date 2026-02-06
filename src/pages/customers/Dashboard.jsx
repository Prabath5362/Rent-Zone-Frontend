import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import USerRouteHandler from "../../services/USerRouteHandler";
import ProductPage from "./product/ProductPage";
import BookingPage from "./booking/MyBookingPage";
import ProductDetailsPage from "./product/ProductDetailsPage";
import ProfilePage from "./profile/ProfilePage";
import Sidebar from "../../components/customers/Sidebar";
import CustomerNavBar from "../../components/customers/NavBar";
import Footer from "../../components/customers/Footer";

export const sidebarContext = createContext();

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <sidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {/* Page Wrapper */}
      <div className="relative min-h-screen bg-primary flex flex-col w-full">
        
        {/* Navbar */}
        <CustomerNavBar />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Protected Routes */}
            <Route element={<USerRouteHandler />}>
              <Route path="/product" element={<ProductPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route
                path="/product/productDetails"
                element={<ProductDetailsPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </sidebarContext.Provider>
  );
}

export default Dashboard;
