import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import ErrorPage from "../ErrorPage";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setState("loading");
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please login to continue", { type: "error" });
      return;
    }

    try {
      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.order.get,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(response.data.bookings);
      setState("success");
      console.log(response.data);
    } catch (error) {
      setState("error");
      toast.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };


  const handleDiliveryStatusChange = async (bookingId, deliveryStatus) => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        toast.error("Please login to continue");
        return;
      }

      const updateData = {
        bookingId: bookingId,
        deliveryStatus: deliveryStatus,
      }


      const response = await axios.put(ServerConstant.baseUrl+ ServerConstant.admin.order.updateBookingStatus, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } );

      toast.success(response.data.message);
    } catch (error) {
       toast.error("Error updating delivery status");
       console.error("Error updating delivery status:", error);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="p-6 w-full">
      {state == "loading" ? (
        <div className="fixed bg-black/50 w-full h-full left-0 top-0 flex items-center justify-center">
          <BounceLoader color="#FF204E" />
        </div>
      ) : state == "error" ? (
        <>
          <ErrorPage />
        </>
      ) : (
        <>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Orders</h1>
            <p className="text-gray-500 mt-1">
              View and manage customer orders
            </p>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Booking Date</th>
                  <th className="p-4">Cost (LKR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{order.id}</td>

                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {order.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.contact}
                      </div>
                    </td>

                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <span className="font-medium">{order.productName}</span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.productType === "rental"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.productType}
                      </span>
                    </td>

                    <td className="p-4">{order.productQuantity}</td>

                    <td className="p-4">{order.bookingDate}</td>

                    <td className="p-4 font-semibold">{order.rentalCost}</td>

                    <td className="p-4">
                      <select
                        onChange={(event)=>handleDiliveryStatusChange(order.id, event.target.value)}
                        defaultValue={order.deliveryStatus}
                        className={`px-3 py-1 rounded-full text-sm outline-none cursor-pointer
                        ${
                          order.deliveryStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.deliveryStatus === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                      >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          navigate("/admin/order/update", {
                            state: order,
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
