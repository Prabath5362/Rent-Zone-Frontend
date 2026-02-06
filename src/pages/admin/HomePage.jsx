import React, { use, useEffect, useState } from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import axios from "axios";
import { ServerConstant } from "../../utils/ServerConstant";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import ErrorPage from "./ErrorPage";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function AdminHomePage() {
  const [state, setState] = useState("loading");
  const [dashboardDetails, setDashboardDetails] = useState("");
  const [splittedRevenue, setSplittedRevenue] = useState([]);
  const [orderStatusCount, setOrderStatusCount] = useState([]);
  const [revenueOverTime, setRevenueOverTime] = useState([]);
  const [ordersCountOverTime, setOrdersCountOverTime] = useState([]);
  const [topProducts,setTopProducts] = useState([]);

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];
  // pending, delivered, cancelled

  const fetchDashboardDetails = async () => {
    setState("loading");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Login first !", { type: "error" });
        setState("error");
        return;
      }
      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.dasboard.get,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setDashboardDetails(response.data.dashboardDetails);
      setSplittedRevenue(response.data.dashboardDetails.splittedRevenue || []);
      setOrderStatusCount(
        response.data.dashboardDetails.ordersStatusCount || [],
      );

      setOrdersCountOverTime(
        response.data.dashboardDetails.ordersCountOverTime || [],
      );

      setRevenueOverTime(
        response.data.dashboardDetails.revenueOverTime || [],
      );

      setTopProducts(
        response.data.dashboardDetails.topProducts || [],
      );

     
      


      setState("success");
    } catch (error) {
      setState("error");
      toast(error.response.data.message || "Something went wrong", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  return (
    <div className="p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-accent">Welcome back, Admin!</div>
      </div>

      {state == "loading" ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <BounceLoader color="#FF204E" />
        </div>
      ) : state == "error" ? (
        <ErrorPage />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Users */}
            <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
              <Users size={28} className="text-accent" />
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardDetails.userCount ?? 0}
                </p>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
              <Package size={28} className="text-accent" />
              <div>
                <p className="text-gray-500 text-sm">Products</p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardDetails.productCount ?? 0}
                </p>
              </div>
            </div>

            {/* Total Orders */}
            {/* Total Orders Card */}
            <div className="bg-white border border-gray-200 shadow p-5 rounded-lg hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <ShoppingCart size={28} className="text-accent" />
                <p className="text-gray-500 text-sm font-medium">Orders</p>
              </div>

              {/* Total Orders */}
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {dashboardDetails.orderCount ?? 0}
              </p>

              {/* Split: Pending / Delivered */}
              <div className="flex flex-col gap-1 mt-3 text-sm text-gray-600">
                <span>Pending: {dashboardDetails.pendingOrdersCount ?? 0}</span>
                <span>
                  Delivered: {dashboardDetails.deliveredOrdersCount ?? 0}
                </span>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white border border-gray-200 shadow p-5 rounded-lg hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <DollarSign size={28} className="text-accent" />
                <p className="text-gray-500 text-sm font-medium">Revenue</p>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {dashboardDetails.totalRevenue ?? 0}
              </p>

              {/* Revenue Split */}
              <div className="flex flex-col gap-1 mt-3 text-sm text-gray-600">
                {splittedRevenue.map((item, index) => (
                  <span key={index}>
                    {item._id}: ${item.totalRevenue}
                  </span>
                ))}
              </div>

              {/* Revenue Today / Monthly */}
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>Today: ${dashboardDetails?.todayOrdersRevenue ?? 0}</span>
                <span>
                  This Month: ${dashboardDetails?.thisMonthordersRevenue ?? 0}
                </span>

                <span>
                  This Year: ${dashboardDetails?.thisYearOrdersRevenue ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ===== Orders by Status ===== */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Orders by Status</h3>

        <PieChart width={280} height={260}>
          <Pie
            data={orderStatusCount}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {orderStatusCount.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* ===== Revenue Over Time ===== */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Revenue Over Time</h3>

        <LineChart width={320} height={260} data={revenueOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" />
        </LineChart>
      </div>

      {/* ===== Orders Count Over Time ===== */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Orders Count Over Time</h3>

        <BarChart width={320} height={260} data={ordersCountOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#22c55e" />
        </BarChart>
      </div>
    </div>

          {/* Top Products */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Products
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Product</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-2">{product.productName}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">{product.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHomePage;
