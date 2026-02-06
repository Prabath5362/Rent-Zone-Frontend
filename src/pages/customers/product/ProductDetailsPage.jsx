import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ImageUploadService from "../../../services/ImageUploadService";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import ErrorPage from "../../admin/ErrorPage";

function ProductDetailsPage() {
  const location = useLocation();
  const product = location.state || {};

  const [state, setState] = useState("");
  const [profilePicState, setProfilePicState] = useState("");
  const [nicFrontState, setNicFrontState] = useState("");
  const [nicBackState, setNicBackState] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const emailRef = useRef();
  const nicRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();

  const [profilePic, setProfilePic] = useState(null);
  const [nicFrontImage, setNicFrontImage] = useState(null);
  const [nicBackImage, setNicBackImage] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [isQuantityValid, setIsQuantityValid] = useState(true); 

  // --- Image Upload Handlers ---
  const handleProfilePicChange = async (e) => {
    setProfilePicState("loading");
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a profile picture.");
      setProfilePicState("");
      return;
    }
    try {
      const url = await ImageUploadService(file);
      setProfilePic(url);
      setProfilePicState("success");
    } catch {
      setProfilePicState("error");
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleNicFrontChange = async (e) => {
    setNicFrontState("loading");
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a NIC front picture.");
      setNicFrontState("");
      return;
    }
    try {
      const url = await ImageUploadService(file);
      setNicFrontImage(url);
      setNicFrontState("success");
    } catch {
      setNicFrontState("error");
      toast.error("Failed to upload NIC front picture.");
    }
  };

  const handleNicBackChange = async (e) => {
    setNicBackState("loading");
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a NIC back picture.");
      setNicBackState("");
      return;
    }
    try {
      const url = await ImageUploadService(file);
      setNicBackImage(url);
      setNicBackState("success");
    } catch {
      setNicBackState("error");
      toast.error("Failed to upload NIC back picture.");
    }
  };

  // --- Calculate Total Cost Dynamically ---
  const calculateTotalCost = () => {
    if (!product.price) return 0;
    if (product.productType === "rental") {
      if (pickupDate && returnDate) {
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const daysDiff = Math.ceil((returnD - pickup) / (1000 * 3600 * 24));
        const days = daysDiff > 0 ? daysDiff : 1;
        return product.price * quantity * days;
      } else {
        return product.price * quantity; // fallback if dates not selected
      }
    } else {
      return product.price * quantity; // buy product
    }
  };

  // --- Handle Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");

    if(product.stock < quantity || product.stock === 0){
      toast.error("Insufficient stock available.");
      setState("");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setState("");
      return;
    }

    if (!profilePic) {
      toast.error("Please upload profile picture");
      setState("");
      return;
    }

    if (product.productType === "rental" && (!nicFrontImage || !nicBackImage)) {
      toast.error("Please upload NIC images");
      setState("");
      return;
    }

    const bookingDetails = {
      email: emailRef.current.value,
      nic: nicRef.current.value,
      profilePic,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      productQuantity: quantity,
      product: product._id,
      rentalCost: calculateTotalCost(),
    };

    if (product.productType === "rental") {
      bookingDetails.nicFrontImage = nicFrontImage;
      bookingDetails.nicBackImage = nicBackImage;
      bookingDetails.pickupDate = pickupDate;
      bookingDetails.returnDate = returnDate;
    }

    try {
      await axios.post(
        ServerConstant.baseUrl + ServerConstant.customer.booking.add,
        bookingDetails,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Booking successful!");
      setShowForm(false);
      setState("success");
    } catch (error) {
      console.log(error.response?.data?.message || error);
      toast.error(error.response?.data?.message || "Booking failed. Please try again.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA] p-4 md:p-8 flex justify-center relative">
      {/* Product Details Card */}
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6">
        {state === "loading" && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-1000">
            <BounceLoader color="#FF204E" />
          </div>
        )}
        {state === "error" && <ErrorPage />}

        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
              {product.productType === "rental"
                ? "Rental product. Please select pickup and return dates."
                : "Buy this product immediately."}
            </p>

            <p className="text-[#FF204E] text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Rs.{product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="font-medium text-sm md:text-base">Quantity:</span>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm md:text-base"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span className="px-3 md:px-4 py-1 text-sm md:text-base">{quantity}</span>
                <button
                  type="button"
                  className={`px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm md:text-base ${!isQuantityValid ? ' opacity-50' : ''}`}
                  onClick={() => {
                    if(product.stock == 0 || product.stock <= quantity){
                        setIsQuantityValid(false);
                  }
                  else{
                    setIsQuantityValid(true);
                    setQuantity(quantity + 1);
                  }
                    }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Cost */}
            <div className="mt-2 p-4 bg-[#FFF8EA] rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Cost:</span>
                <span className="text-[#FF204E] text-xl font-bold">Rs.{calculateTotalCost()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-[#FF204E] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-red-600 transition w-full mt-4"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Floating Booking Form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowForm(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 animate-slideUp p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 md:p-6 border border-gray-200 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
              >
                ✕
              </button>

              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Booking Details
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    required
                    className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    ref={contactRef}
                    required
                    className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  ref={addressRef}
                  required
                  className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                />

                <input
                  type="text"
                  placeholder="NIC Number"
                  ref={nicRef}
                  required
                  className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                />

                {/* Profile Picture */}
                <div className="flex flex-col md:flex-row md:gap-4 md:items-center mt-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-100 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {profilePicState === "loading" ? (
                      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <BounceLoader color="#FF204E" />
                      </div>
                    ) : profilePic ? (
                      <img src={profilePic} alt="" />
                    ) : (
                      <span className="text-gray-400 text-xs md:text-sm">Profile</span>
                    )}
                  </div>
                  <p className="text-gray-800 text-sm md:text-base mt-2 md:mt-0">
                    Add clear profile image
                  </p>
                </div>

                {/* Rental-specific fields */}
                {product.productType === "rental" && (
                  <>
                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                      <div className="w-full md:w-1/2">
                        <div className="w-full h-20 md:h-24 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-100 relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNicFrontChange}
                            required
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {nicFrontState === "loading" ? (
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                              <BounceLoader color="#FF204E" />
                            </div>
                          ) : nicFrontImage ? (
                            <img src={nicFrontImage} alt="" />
                          ) : (
                            <span className="text-gray-400 text-xs md:text-sm">NIC Front</span>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-1/2">
                        <div className="w-full h-20 md:h-24 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-100 relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNicBackChange}
                            required
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {nicBackState === "loading" ? (
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                              <BounceLoader color="#FF204E" />
                            </div>
                          ) : nicBackImage ? (
                            <img src={nicBackImage} alt="" />
                          ) : (
                            <span className="text-gray-400 text-xs md:text-sm">NIC Back</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        required
                        className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                      />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                        className="border px-3 py-2 rounded-md w-full text-sm md:text-base"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="bg-[#FF204E] text-white px-4 py-2 rounded-md font-semibold mt-3 hover:bg-red-600 transition text-sm md:text-base"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.3s ease-in-out; }
        `}
      </style>
    </div>
  );
}

export default ProductDetailsPage;
