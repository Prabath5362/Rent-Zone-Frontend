import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash } from "lucide-react";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ErrorPage from "../ErrorPage";

function ProductPage() {
  const [product, setProduct] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    setState("loading");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        setState("error");
        return;
      }

      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.product.get,
        { headers: { Authorization: "Bearer " + token } }
      );

      setProduct(response.data.products || []);
      setState("success");
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching products");
      toast.error("Something went wrong");
      setState("error");
    }
  };

  const handleDelete = async (productKey) => {
    try {
      setState("loading");
      await axios.delete(
        ServerConstant.baseUrl + ServerConstant.admin.product.delete + `/${productKey}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Product deleted successfully");
      fetchProduct();
      setState("success");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.response?.data?.message || "Error deleting product");
      setState("error");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">Manage rental tools and equipment</p>
        </div>

        <button
          onClick={() => navigate("/admin/product/add")}
          className="mt-2 md:mt-0 flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Top Controls */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <select className="border rounded-md px-3 py-2 w-full md:w-48">
          <option>All Categories</option>
          <option>Electrical</option>
          <option>Carpenter</option>
          <option>Masonry</option>
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="overflow-x-auto [@media(min-width:955px)]:block [@media(max-width:955px)]:hidden">
        <div className="min-w-[900px] bg-white shadow rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4 min-w-[150px]">Stock</th>
                <th className="p-4 min-w-[100px]">Price / Day</th>
                <th className="p-4">Image</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {product.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800 truncate max-w-[200px]">{item.name}</td>
                  <td className="p-4 text-gray-600 truncate max-w-[150px]">{item.categories}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.stock > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-800">{item.price}</td>
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate("/admin/product/update", { state: item })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.productKey)} className="text-red-600 hover:text-red-800">
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
        {product.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-gray-600 text-sm truncate">{item.categories}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.stock > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {item.stock} in stock
              </span>
              <span className="font-semibold text-gray-800">{item.price}</span>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate("/admin/product/update", { state: item })}
                className="p-2 rounded-lg bg-blue-100 text-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(item.productKey)}
                className="p-2 rounded-lg bg-red-100 text-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
