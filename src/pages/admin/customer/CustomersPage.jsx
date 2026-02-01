import React, { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import ErrorPage from "../ErrorPage";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setState("loading");
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue");
      setState("error");
      return;
    }

    try {
      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.customer.get,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCustomers(response.data.users || []);
      setState("success");
    } catch (error) {
      setState("error");
      toast.error("Failed to fetch customers");
      console.error(error);
    }
  };

  const handleDeleteCustomer = async (email) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue");
      return;
    }

    try {
      await axios.delete(
        ServerConstant.baseUrl + ServerConstant.admin.customer.delete + `/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Customer deleted successfully");
      fetchCustomers();
    } catch (error) {
      toast.error("Failed to delete customer");
      console.error(error);
    }
  };

  /* ================== UI STATES ================== */
  if (state === "loading") {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <BounceLoader color="#FF204E" />
      </div>
    );
  }

  if (state === "error") return <ErrorPage />;

  /* ================== PAGE ================== */
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500">View and manage registered customers</p>
        </div>
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto w-full [@media(min-width:955px)]:block [@media(max-width:955px)]:hidden">
        <div className="min-w-[900px] bg-white shadow rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-left">Profile</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left [@media(max-width:1100px)]:w-[100px]">Email</th>
                <th className="p-4 text-left">NIC</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img
                      src={customer.profilePic}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {customer.firstname} {customer.lastname}
                  </td>

                  <td className="p-4 text-gray-600 [@media(max-width:1100px)]:w-[100px]">
                    <p className="truncate [@media(max-width:1100px)]:w-[100px]">
                      {customer.email}
                    </p>
                  </td>

                  <td className="p-4 [@media(max-width:937px)]:w-[20]">{customer.nic}</td>
                  <td className="p-4">{customer.contact}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                      {customer.role}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center gap-3 [@media(max-width:955px)]:flex-col [@media(max-width:955px)]:items-start ">
                    <button
                      onClick={() =>
                        navigate("/admin/customer/update", { state: customer })
                      }
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Edit className="" size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteCustomer(customer.email)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash size={16} />
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
        {customers.map((customer, index) => (
          <div key={index} className="rounded-xl shadow p-4 flex gap-4 bg-white">
            <img
              src={customer.profilePic}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {customer.firstname} {customer.lastname}
              </h3>

              <p className="text-sm text-gray-500 truncate">{customer.email}</p>

              <p className="text-sm text-gray-600 mt-1">📞 {customer.contact}</p>

              <p className="text-xs text-gray-500 mt-1 truncate">{customer.address}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {customer.role}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate("/admin/customer/update", { state: customer })
                    }
                    className="p-2 rounded-lg bg-blue-100 text-blue-600"
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    onClick={() => handleDeleteCustomer(customer.email)}
                    className="p-2 rounded-lg bg-red-100 text-red-600"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomersPage;
