import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerConstant } from "../../../utils/ServerConstant";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import ErrorPage from "../ErrorPage";
import { useNavigate, useLocation } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("loading");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.category) {
      setFilterCategory(location.state.category);
    } else {
      setFilterCategory("All");
    }
  }, [location.state]);

  const fetchProducts = async () => {
    setState("loading");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        setState("error");
        return;
      }

      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.customer.product.get,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(response.data.products || []);
      setState("success");
    } catch (error) {
      setState("error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ✅ FULL PAGE STATES */
  if (state === "loading") {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <BounceLoader color="#FF204E" />
      </div>
    );
  }

  if (state === "error") {
    return <ErrorPage />;
  }

  /* FILTER LOGIC */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      product.categories?.some(
        (cat) => cat.toLowerCase() === filterCategory.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    "All",
    ...new Set(products.flatMap((p) => p.categories || [])),
  ];

  return (
    <div className="h-full w-full bg-[#EAEAEA] p-8">
      <h1 className="text-4xl font-bold text-[#FF204E] text-center mb-6">
        {filterCategory === "All"
          ? "Our Products"
          : `${filterCategory} Products`}
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#FF204E]"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#FF204E]"
        >
          {allCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredProducts.map((product) => (
            <div
              key={product.productKey}
              className="bg-[#FFF8EA] rounded-xl p-4 shadow-md hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h2 className="text-sm font-medium text-center">
                {product.name}
              </h2>

              <p className="text-[#FF204E] font-bold text-lg text-center">
                Rs.{product.price}
              </p>

              <button
                onClick={() =>
                  navigate("/product/productDetails", { state: product })
                }
                className="mt-2 bg-[#FF204E] text-white w-full py-1 rounded-md"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default ProductPage;
