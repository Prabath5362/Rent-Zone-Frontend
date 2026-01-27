
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

import Dashboard from "./pages/customers/Dashboard";
import { Toaster } from "react-hot-toast";
import AdminRoutehandler from "./services/AdminRoutehandler";
import USerRouteHandler from "./services/USerRouteHandler";
import UnauthorizedPage from "./pages/Unauthorized";

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
          <Route element={<AdminRoutehandler/>}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          {/* User Routes */}
          <Route element={<USerRouteHandler/>}>
            <Route path="/*" element={<Dashboard />} />
          </Route>



          {/* Unauthorized */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
