
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

import Dashboard from "./pages/customers/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-primary h-screen w-full">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* User Routes */}
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
