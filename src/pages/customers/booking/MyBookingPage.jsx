import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerConstant } from "../../../utils/ServerConstant";
import { BounceLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";

// Format date nicely
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MyBookingPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [state, setState] = useState("loading");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    setState("loading");
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User not authenticated");
      setState("error");
      return;
    }

    try {
      const tokenData = jwtDecode(token);
      const email = tokenData.email;

      const response = await axios.get(
        `${ServerConstant.baseUrl}${ServerConstant.customer.booking.get}/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(response.data?.bookings || []);
      setState("success");
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error.message);
      setState("error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Status colors
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  // Filter bookings by status and product type
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === "All"
        ? true
        : b.deliveryStatus?.toLowerCase() === statusFilter.toLowerCase();
    const matchesType =
      typeFilter === "All"
        ? true
        : b.product?.productType?.toLowerCase() === typeFilter.toLowerCase();
    return matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#EAEAEA] p-8">
      <h1 className="text-4xl font-bold text-[#FF204E] text-center mb-6">
        My Bookings
      </h1>

      {/* Loading overlay */}
      {state === "loading" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <BounceLoader color="#FF204E" />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full font-medium transition ${
                statusFilter === status
                  ? "bg-[#FF204E] text-white"
                  : "bg-white text-gray-800 hover:bg-[#FF204E] hover:text-white"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Product Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
        >
          <option value="All">All Types</option>
          <option value="rental">Rental</option>
          <option value="spare">Spare</option>
        </select>
      </div>

      {/* Table view */}
      {filteredBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#FF204E] text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Pick Date</th>
                <th className="py-3 px-4 text-left">Return Date</th>
                <th className="py-3 px-4 text-left">Price (Rs.)</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={booking.product?.image}
                      alt={booking.product?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{booking.product?.name}</span>
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {booking.product?.productType || "-"}
                  </td>
                  <td className="py-3 px-4">{formatDate(booking.pickupDate)}</td>
                  <td className="py-3 px-4">{formatDate(booking.returnDate)}</td>
                  <td className="py-3 px-4">
                    {booking.rentalCost || booking.product?.price || 0}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[booking.deliveryStatus?.toLowerCase()] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.deliveryStatus || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No bookings found.
        </p>
      )}
    </div>
  );
}

export default MyBookingPage;
