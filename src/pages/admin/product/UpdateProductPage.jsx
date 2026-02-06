import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import ImageUploadService from "../../../services/ImageUploadService";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateProductPage() {
  const productKeyRef = useRef("");
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const stockRef = useRef("");
  const navigate = useNavigate();

  const location = useLocation();
  const product = location.state;


  const [categories, setCategories] = useState(product.categories);
  const [productType, setProductType] = useState(product.productType);
  const [imageUrl, setImageUrl] = useState(product.image);

  const [state, setState] = useState("");
  const [imageLoading, setImageLoading] = useState(false);



  

  const handleAddProduct =async (e)=> {
    setState("loading");
    e.preventDefault();

    const productData = {
      productKey: productKeyRef.current.value,
      name : nameRef.current.value,
      description : descriptionRef.current.value,
      price : priceRef.current.value,
      stock : stockRef.current.value,
      categories: categories,
      productType: productType,
      image: imageUrl
    };
  
    if(productData.productKey === "" || productData.name === "" || productData.description === "" || productData.price === "" || productData.stock === "" || productData.categories.length === 0 || productData.productType === "" || productData.imageUrl === ""){
      toast("Please fill all the fields", {type:"error"});
      setState("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if(!token){
        toast("Please login first", {type:"error"});
        setState("");
        return;
      }

      const response = await axios.put(ServerConstant.baseUrl+ ServerConstant.admin.product.update+`/${product.productKey}`, productData, {
        headers: {
          Authorization: "Bearer "+ token
        }
      })

      toast("Product updated successfully", {type:"success"});
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
      toast("Something went wrong", {type:"error"});
      console.log(error.response?.data?.message || "Error adding product");
      setState("error");
    }
  
  }


  const handleSelectCategories = (e)=> {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if(isChecked == true){
        setCategories([...categories, value]);
    }

    if(isChecked == false){
      setCategories(categories.filter((e)=>(
        e != value
      )))
    }
    
  }


  const handleSelectProductType = (e)=>{
    const value = e.target.value;
    setProductType(value);
  }


  const handleImageSelect = async (e)=> {
    setImageLoading(true);
    try {
      const imageUrl = await ImageUploadService(e.target.files[0]);
      setImageUrl(imageUrl);
      setImageLoading(false);

    } catch (error) {
      console.log("upload error: "+error);
      
      setImageLoading(false);
    }
  }




  return (
    <div className=" min-h-full p-6 w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Update Product
        </h1>
        <p className="text-gray-500 mt-1">
          Update the details of an existing tool or equipment for rental
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-6 relative">
        {
          state === "loading" ? <div className="absolute bg-black/40 w-full h-full top-0 left-0 rounded-xl flex items-center justify-center">
          <BounceLoader/>
        </div> : null
        }
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              ref={nameRef}
              defaultValue={product.name}
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
              defaultValue={product.productKey}
              type="text"
              placeholder="Ex: DRL-001"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input type="checkbox" name="Electrical" id="electrical" value={"electrical"} onChange={(e)=>handleSelectCategories(e)} defaultChecked={product.categories.includes("electrical")}/>
            <input type="checkbox" name="Carpenter" id="carpenter" value={"carpenter"} onChange={(e)=> handleSelectCategories(e)} defaultChecked={product.categories.includes("carpenter")} />
            <input type="checkbox" name="Masonry" id="masonry" value={"masonry"} onChange={(e)=> handleSelectCategories(e)} defaultChecked={product.categories.includes("masonry")} />
          </div>

          {/* product type */}
          <div className="w-50 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
            <select name="" id="" className="" onChange={(e)=> handleSelectProductType(e)} defaultValue={product.productType}>
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
              defaultValue={product.price}
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
              defaultValue={product.stock}
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
              defaultValue={product.description}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

           <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-accent transition">

            {

              imageLoading ? <BounceLoader color="#FF204E"/> : 
              
              imageUrl ?  <img src={imageUrl} alt="Product" className=" h-20 object-cover rounded-md" /> :
              
              <>
                <Upload className="text-gray-400 mb-2" size={28} />
              <p className="text-gray-500 text-sm">
                Click to upload or drag & drop
              </p>
               </>
            } 
            <input type="file" className="hidden" onChange={(e)=> handleImageSelect(e)} />
            

              
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

export default UpdateProductPage;
