import React from "react";
import herobg from "./../../assets/images/herobg.avif";

function HomePage() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      {/* Hero Section */}
      <section
        className="relative py-16 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${herobg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Content */}
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
      <section className=" py-16 px-6 text-center hero relative z-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 z-100 relative">
          Discover Your Next Favorite Product
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Shop the latest products with amazing deals and fast delivery.
        </p>

        <button className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full text-lg hover:opacity-90 transition">
          Shop Now
        </button>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Home", "Accessories"].map(
            (category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6 text-center"
              >
                <h3 className="text-lg font-medium text-gray-700">
                  {category}
                </h3>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-[var(--color-secondary)]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-4" />

              <h3 className="text-lg font-medium text-gray-800">
                Product Name
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Short product description
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-[var(--color-accent)] font-bold">
                  LKR 4,500
                </span>

                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Don’t Miss Our Special Offers
        </h2>

        <button className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full hover:opacity-90 transition">
          View Offers
        </button>
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
