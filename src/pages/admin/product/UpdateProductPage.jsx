import React from "react";
import { Upload } from "lucide-react";

function UpdateProductPage() {
  return (
    <div className="p-6 w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Update Product
        </h1>
        <p className="text-gray-500 mt-1">
          Modify product details and availability
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              defaultValue="Drill Machine"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              defaultValue="Electrical"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>Electrical</option>
              <option>Carpenter</option>
              <option>Masonry</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Day
            </label>
            <input
              type="number"
              defaultValue="15"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Stock
            </label>
            <input
              type="number"
              defaultValue="12"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              defaultValue="High-quality electric drill suitable for professional use."
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Current Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <img
              src="https://via.placeholder.com/300x200"
              alt="Product"
              className="rounded-lg shadow mb-4"
            />
          </div>

          {/* Update Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Image
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-accent transition">
              <Upload className="text-gray-400 mb-2" size={28} />
              <p className="text-gray-500 text-sm">
                Click to upload or drag & drop
              </p>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-md hover:opacity-90 transition"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
