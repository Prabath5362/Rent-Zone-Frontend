import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash } from "lucide-react";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ErrorPage from "../ErrorPage";

function ProductPage() {

  const [product,setProduct] = useState([]);
  const [state,setState] = useState("loading");
  const navigate = useNavigate();

  const fetchProduct =async () => {
    setState("loading");
    try {
      const token = localStorage.getItem("token");
      if(!token){
        toast("Please login first", {type:"error"});
        return;
      }
      
      const response = await axios.get(ServerConstant.baseUrl+ServerConstant.admin.product.get,{
        headers: {
          Authorization: "Bearer "+ token
        }
      });

      setProduct(response.data.products);
      setState("success");
      
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching products");
      toast("Something went wrong", {type:"error"});
      setState("error");
    }
  }


  const handleDelete = async(productKey)=> {
    try {
      setState("loading");
      const response = await axios.delete(ServerConstant.baseUrl+ServerConstant.admin.product.delete+`/${productKey}`, {
        headers: {
          Authorization: "Bearer "+ localStorage.getItem("token")
        }
      });
      toast("Product deleted successfully", {type:"success"});
      fetchProduct();
      setState("success");
    } catch (error) {
      toast("Something went wrong", {type:"error"});
      console.log(error.response?.data?.message || "Error deleting product");
      setState("error");
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[]);

  return (
    <div className="p-6 w-full">
      
      {
        state == "loading" ? 
          <div className="fixed bg-black/50 w-full h-full left-0 top-0 flex items-center justify-center">
              <BounceLoader color="#FF204E"/>
          </div> :  
        
        state == "error" ? <ErrorPage/> :
          
          <>
          {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">
            Manage rental tools and equipment
          </p>
        </div>

        <button onClick={
          ()=>{
            navigate("/admin/product/add");
          }
        } className="mt-4 md:mt-0 flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition">
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

      {/* Products Table */}
      
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price / Day</th>
              <th className="p-4">Image</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          
          <tbody>
            {product.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-400 hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="p-4 text-gray-600">{item.categories}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.stock > 5
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.stock} in stock
                  </span>
                </td>
                <td className="p-4 font-semibold text-gray-800">
                  {item.price}
                </td>
                <td className="p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                </td>
                <td className="p-4 flex items-center justify-center gap-3">
                  <button onClick={()=>{
                    navigate("/admin/product/update", {state: item});
                  }} className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={()=> {
                    handleDelete(item.productKey)
                  }} className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
      }
      
    </div>
  );
}

export default ProductPage;
