import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import ImageUploadService from "../../../services/ImageUploadService";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function AddProductPage() {
  const productKeyRef = useRef("");
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const stockRef = useRef("");

  const newCategoryRef = useRef("");

  const [fetchedCategories, setFetchedCategories] = useState([]);

  const [categories, setCategories] = useState([]);
  const [productType, setProductType] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [state, setState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    setState("loading");
    e.preventDefault();

    const productData = {
      productKey: productKeyRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      stock: stockRef.current.value,
      categories: categories,
      productType: productType,
      image: imageUrl,
    };

    if (
      productData.productKey === "" ||
      productData.name === "" ||
      productData.description === "" ||
      productData.price === "" ||
      productData.stock === "" ||
      productData.categories.length === 0 ||
      productData.productType === "" ||
      productData.imageUrl === ""
    ) {
      toast("Please fill all the fields", { type: "error" });
      setState("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        setState("");
        return;
      }

      const response = await axios.post(
        ServerConstant.baseUrl + ServerConstant.admin.product.add,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast("Product added successfully", { type: "success" });
      //reset form
      productKeyRef.current.value = "";
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
      setCategories([]);
      setProductType("");
      setImageUrl("");
      setState("success");
      navigate("/admin/product");
    } catch (error) {
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error adding product");
      setState("error");
    }
  };

  const handleSelectCategories = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked == true) {
      setCategories([...categories, value]);
    }

    if (isChecked == false) {
      setCategories(categories.filter((e) => e != value));
    }
  };

  const handleSelectProductType = (e) => {
    const value = e.target.value;
    setProductType(value);
  };

  const handleImageSelect = async (e) => {
    setImageLoading(true);
    try {
      const imageUrl = await ImageUploadService(e.target.files[0]);
      setImageUrl(imageUrl);
      setImageLoading(false);
    } catch (error) {
      console.log("upload error: " + error);

      setImageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryState("loading");
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        return;
      }

      const response = await axios.get(
        ServerConstant.baseUrl + ServerConstant.admin.category.get,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setFetchedCategories(response.data.categories);
      setCategoryState("success");
    } catch (error) {
      setCategoryState("error");
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error fetching categories");
    }
  };

  const handleAddNewCategory = async () => {
    const newCategory = newCategoryRef.current.value;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        return;
      }

      const data = {
        name: newCategory,
      };

      if (newCategory && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
      }

      const response = await axios.post(
        ServerConstant.baseUrl + ServerConstant.admin.category.add,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast("Category added successfully", { type: "success" });
      newCategoryRef.current.value = "";
      fetchCategories();
    } catch (error) {
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error adding category");
    }
  };

  const deleteCategory = async(category) => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        return;
      }

      const response = await axios.delete(ServerConstant.baseUrl+ServerConstant.admin.category.delete+"/"+category,{
        headers : {
          Authorization: "Bearer " + token,
        }
      });
      toast("Category deleted successfully", { type: "success" });
      fetchCategories();
    } catch (error) {
      toast("Something went wrong", { type: "error" });
      console.log(error.response?.data?.message || "Error deleting category");
    }
    
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" min-h-full p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Product
        </h1>
        <p className="text-gray-500 mt-1">
          Add a new tool or equipment for rental
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-6 relative">
        {state == "loading" ? (
          <div className="absolute bg-black/40 w-full h-full top-0 left-0 rounded-xl flex items-center justify-center">
            <BounceLoader />
          </div>
        ) : null}
        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <p>{imageUrl}</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Ex: Drill Machine"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Product Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Key
            </label>
            <input
              ref={productKeyRef}
              type="text"
              placeholder="Ex: DRL-001"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <div className="flex flex-col gap-2 mb-3">
              {categoryState !== "success" ? (
                <>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="Electrical"
                      id="electrical"
                      value={"electrical"}
                      onChange={(e) => handleSelectCategories(e)}
                    />
                    Electrical
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="Carpenter"
                      id="carpenter"
                      value={"carpenter"}
                      onChange={(e) => handleSelectCategories(e)}
                    />
                    Carpenter
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="Masonry"
                      id="masonry"
                      value={"masonry"}
                      onChange={(e) => handleSelectCategories(e)}
                    />
                    Masonry
                  </label>
                </>
              ) : (
                fetchedCategories.map((category,index) => (
                  <div key={index} className="flex justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name={category.name}
                        id={category.name}
                        value={category.name}
                        onChange={(e) => handleSelectCategories(e)}
                      />
                      {category.name}
                    </label>

                    <MdDelete onClick={()=> deleteCategory(category.name)} className="mr-4 text-accent"/>
                  </div>
                ))
              )}
            </div>

            {/* Add new category UI (UI ONLY) */}
            <div className="flex items-center gap-2">
              <input
                ref={newCategoryRef}
                type="text"
                placeholder="Add new category"
                className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <button
                onClick={handleAddNewCategory}
                type="button"
                className="w-10 h-10 flex items-center justify-center bg-accent text-white rounded-md hover:opacity-90"
              >
                +
              </button>
            </div>
          </div>

          {/* product type */}
          <div className="w-50 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
            <select
              name=""
              id=""
              className=""
              onChange={(e) => handleSelectProductType(e)}
            >
              <option value="">Select product type</option>
              <option value="rental">Rental</option>
              <option value="spare">Spare</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Day
            </label>
            <input
              ref={priceRef}
              type="number"
              placeholder="Ex: 15"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Stock
            </label>
            <input
              ref={stockRef}
              type="number"
              placeholder="Ex: 10"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              rows="4"
              placeholder="Enter product description"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-accent transition">
              {imageLoading ? (
                <BounceLoader color="#FF204E" />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Product"
                  className=" h-20 object-cover rounded-md"
                />
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" size={28} />
                  <p className="text-gray-500 text-sm">
                    Click to upload or drag & drop
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageSelect(e)}
                  />
                </>
              )}
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
