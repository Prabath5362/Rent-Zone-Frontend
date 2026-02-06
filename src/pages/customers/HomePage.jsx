import React, { useEffect, useState } from "react";
import herobg from "./../../assets/images/herobg.avif";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerConstant } from "../../utils/ServerConstant";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [categories, setCategories] = useState([]);
  const [categoryState, setCategoryState] = useState("loading");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProductsState, setFeaturedProductsState] = useState("loading");
  const [state, setState] = useState("loading");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setState("loading");
      setCategoryState("loading");
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        return;
      }

      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.customer.category.get,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setCategories(response.data.categories || []);
      setState("success");
      setCategoryState("success");
    } catch (error) {
      setCategoryState("error");
      setState("error");
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error fetching categories");
    }
  };

  // Fetch featured products from API
  const fetchFeaturedProducts = async () => {
    try {
      setState("loading");
      setFeaturedProductsState("loading");
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        return;
      }
      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.customer.product.getFeaturedProducts,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFeaturedProducts(response?.data?.featuredProducts ?? []);
      setFeaturedProductsState("success");
      setState("success");
    } catch (error) {
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error fetching featured products");
      setFeaturedProductsState("error");
      setState("error");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  // Handle category click (including "All")
  const handleCategoryClick = (categoryName) => {
    navigate("/product", { state: { category: categoryName } });
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      {/* Hero Section */}
      <section
        className="relative py-16 px-6 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Your Next Favorite Product
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto mb-6">
            Shop the latest products with amazing deals and fast delivery.
          </p>
          <button className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full text-lg hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Always show "All" as first card */}
          <div
            onClick={() => handleCategoryClick("All")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6 text-center"
          >
            <h3 className="text-lg font-medium text-gray-700">ALL</h3>
          </div>

          {/* Show categories from API */}
          {categoryState === "loading"
            ? ["Meson", "Carpenter", "Electronics"].map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6 text-center"
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {category.toUpperCase()}
                  </h3>
                </div>
              ))
            : categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6 text-center"
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {category.name.toUpperCase()}
                  </h3>
                </div>
              ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-[var(--color-secondary)]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProductsState === "loading"
            ? [1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <h3 className="text-sm md:text-md font-semibold text-gray-800 mb-1 line-clamp-2">
                      Product Name
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-2">
                      Short description
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-accent)] font-bold text-sm md:text-md">
                        LKR 4,500
                      </span>
                      <button className="bg-[var(--color-accent)] text-white px-3 py-1 rounded hover:bg-[var(--color-accent-dark)] text-xs md:text-sm transition">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : featuredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  <div className="w-full h-48 bg-gray-100 flex justify-center items-center overflow-hidden">
                    <img
                      src={product?.image ?? ""}
                      alt={product?.name ?? "Product Image"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <h3 className="text-sm md:text-md font-semibold text-gray-800 mb-1 line-clamp-2">
                      {product?.name ?? "Product Name"}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-2">
                      {product?.description ?? "Short description goes here."}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--color-accent)] font-bold text-sm md:text-md">
                        {product?.price ? `LKR ${product.price}` : "LKR 4,500"}
                      </span>
                      <button className="bg-[var(--color-accent)] text-white px-3 py-1 rounded hover:bg-[var(--color-accent-dark)] text-xs md:text-sm transition">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 px-6 text-center">
        <p>© 2026 RentZone. All rights reserved.</p>
        <button
          onClick={handleLogout}
          className="mt-3 text-sm text-red-400 hover:underline"
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default HomePage;
