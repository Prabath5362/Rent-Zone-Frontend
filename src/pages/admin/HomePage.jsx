import React from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

function AdminHomePage() {
  return (
    <div className="p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-accent">Welcome back, Admin!</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <Users size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">128</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <Package size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <p className="text-2xl font-bold text-gray-800">85</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <ShoppingCart size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="text-2xl font-bold text-gray-800">246</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <DollarSign size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-gray-800">$12,450</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Overview</h2>
          {/* Placeholder chart */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Chart Component Here
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          {/* Placeholder table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Product</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Drill Machine</td>
                  <td className="p-2">Electrical</td>
                  <td className="p-2">12</td>
                  <td className="p-2">$45</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Hammer</td>
                  <td className="p-2">Carpenter</td>
                  <td className="p-2">25</td>
                  <td className="p-2">$15</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Cement Mixer</td>
                  <td className="p-2">Masonry</td>
                  <td className="p-2">3</td>
                  <td className="p-2">$200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
