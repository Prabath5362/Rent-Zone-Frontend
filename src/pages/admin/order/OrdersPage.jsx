import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import ErrorPage from "../ErrorPage";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setState("loading");
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      setState("error");
      return;
    }

    try {
      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.order.get,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data.bookings || []);
      setState("success");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
      setState("error");
    }
  };

  const handleDeliveryStatusChange = async (bookingId, deliveryStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      return;
    }

    try {
      await axios.put(
        ServerConstant.baseUrl + ServerConstant.admin.order.updateBookingStatus,
        { bookingId, deliveryStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Delivery status updated");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      toast.error("Error updating delivery status");
    }
  };

  const handleDelete = async(bookingId)=> {
    setState("loading");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue");
        setState("");
        return;
      }
      const response = await axios.delete(
        ServerConstant.baseUrl + ServerConstant.admin.order.delete+"/"+bookingId,
        {
          headers: { Authorization: `Bearer ${token}` },
  
        }
      );
      console.log();
      
      toast.success(response.data.message || "Order deleted ");
      await fetchOrders();
      setState("success");
    } catch (error) {
      setState("error");
      toast.error("Failed to delete order");
      console.error("Error deleting order:", error.message);
    }
  }


  /* ================= UI STATES ================= */
  if (state === "loading") {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <BounceLoader color="#FF204E" />
      </div>
    );
  }

  if (state === "error") return <ErrorPage />;

  /* ================= PAGE ================= */
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">View and manage customer orders</p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="overflow-x-auto [@media(min-width:955px)]:block [@media(max-width:955px)]:hidden">
        <div className="min-w-[900px] bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
              <tr>
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

                  <td className="p-4 max-w-[150px] truncate">
                    <div className="font-medium text-gray-800 truncate">{order.email}</div>
                    <div className="text-sm text-gray-500 truncate">{order.contact}</div>
                  </td>

                  <td className="p-4 flex items-center gap-3 max-w-[200px] truncate">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <span className="font-medium truncate">{order.productName}</span>
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
                      defaultValue={order.deliveryStatus}
                      onChange={(e) =>
                        handleDeliveryStatusChange(order.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm outline-none cursor-pointer ${
                        order.deliveryStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.deliveryStatus === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate("/admin/order/update", { state: order })
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button onClick={()=> handleDelete(order.id)} className="text-red-600 hover:text-red-800">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="[@media(min-width:955px)]:hidden space-y-4 mt-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800 truncate">{order.email}</div>
              <div className="text-sm text-gray-500">{order.contact}</div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium truncate">{order.productName}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.productType === "rental"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.productType}
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <span>Qty: {order.productQuantity}</span>
              <span className="font-semibold">{order.rentalCost} LKR</span>
            </div>

            <div className="mt-2">
              <select
                defaultValue={order.deliveryStatus}
                onChange={(e) =>
                  handleDeliveryStatusChange(order.id, e.target.value)
                }
                className={`px-3 py-1 rounded-full text-sm outline-none cursor-pointer ${
                  order.deliveryStatus === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.deliveryStatus === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  navigate("/admin/order/update", { state: order })
                }
                className="p-2 rounded-lg bg-blue-100 text-blue-600"
              >
                <Edit size={16} />
              </button>
              <button onClick={()=>handleDelete(order.id)} className="p-2 rounded-lg bg-red-100 text-red-600">
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
