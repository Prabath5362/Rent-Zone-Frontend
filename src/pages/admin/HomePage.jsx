import React, { useEffect, useState } from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import axios from "axios";
import { ServerConstant } from "../../utils/ServerConstant";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import ErrorPage from "./ErrorPage";

function AdminHomePage() {

  const [state, setState] = useState("loading");
  const [dashboardDetails,setDashboardDetails] = useState("");
  const [splittedRevenue, setSplittedRevenue] = useState([]);


  const fetchDashboardDetails = async()=> {
    setState("loading");
    try {
      const token  = localStorage.getItem("token");
      if(!token){
        toast("Login first !", {type: "error"});
        return;
      }
      const response = await axios.get(ServerConstant.baseUrl+ServerConstant.admin.dasboard.get, {
        headers : {
          Authorization : "Bearer "+ token
        }
      });
      setDashboardDetails(response.data.dashboardDetails);
      setSplittedRevenue(response.data.dashboardDetails.splittedRevenue || []);
      

      setState("success");
    } catch (error) {
      setState("error");
      toast(error.response.data.message || "Something went wrong",{type: "error"})
    }
  }

  useEffect(()=>{
     fetchDashboardDetails();
  },[]);

  return (
    <div className="p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-accent">Welcome back, Admin!</div>
      </div>
      
   

      {

        state == "loading" ?

         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <BounceLoader color="#FF204E" />
              </div> :

        state == "error" ? 
          <ErrorPage/> :

        <>
          {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Users */}
        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <Users size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{dashboardDetails.userCount ?? 0}</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg flex items-center gap-4 hover:shadow-lg transition">
          <Package size={28} className="text-accent" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <p className="text-2xl font-bold text-gray-800">{dashboardDetails.productCount ?? 0}</p>
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
    <span>Delivered: {dashboardDetails.deliveredOrdersCount ?? 0}</span>
  </div>
</div>


  

        {/* Revenue Card */}
        <div className="bg-white border border-gray-200 shadow p-5 rounded-lg hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <DollarSign size={28} className="text-accent" />
            <p className="text-gray-500 text-sm font-medium">Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{dashboardDetails.totalRevenue ?? 0}</p>

          {/* Revenue Split */}
          <div className="flex flex-col gap-1 mt-3 text-sm text-gray-600">
            
            {
              splittedRevenue.map((item, index)=> (
                <span key={index}>{item._id}: ${item.totalRevenue}</span>
              ))
            }
            
            <span>Final Balance: $11,250</span>
          </div>

          {/* Revenue Today / Monthly */}
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Today: ${dashboardDetails?.todayOrdersRevenue ?? 0}</span>
            <span>This Month: ${dashboardDetails?.thisMonthordersRevenue ?? 0}</span>

            <span>This Year: ${dashboardDetails?.thisYearOrdersRevenue ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Overview */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Overview</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Chart Component Here
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
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
        </>

      }

      
    </div>
  );
}

export default AdminHomePage;
