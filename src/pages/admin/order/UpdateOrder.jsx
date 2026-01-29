import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ServerConstant } from "../../../utils/ServerConstant";

function UpdateOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state || {};

  const [deliveryStatus, setDeliveryStatus] = useState(
    order.deliveryStatus || "",
  );

  console.log(order);

  const idRef = useRef();
  const emailRef = useRef();
  const nicRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const productNameRef = useRef();
  const productCategoriesRef = useRef();
  const productQuantityRef = useRef();
  const bookingDateRef = useRef();
  const rentalCostRef = useRef();


  const handleUpdate = async () => {
    const updateData = {
      id: idRef.current.value,
      email: emailRef.current.value,
      nic: nicRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      productName: productNameRef.current.value,
      productQuantity: productQuantityRef.current.value,
      rentalCost: rentalCostRef.current.value,
      deliveryStatus: deliveryStatus,
    };

    console.log();

    try {
      if (
        updateData.id === "" ||
        updateData.email === "" ||
        updateData.contact === "" ||
        updateData.address === "" ||
        updateData.productQuantity === "" ||
        updateData.rentalCost === "" ||
        updateData.deliveryStatus === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        ServerConstant.baseUrl + ServerConstant.admin.order.update,
        updateData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error updating order: ");
      console.log(error.message);
    }
  };

  const handleSelectDiliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const formatDate = (date) => {
    console.log("Date : "+ date);
    
  };

  return (
    <div className="min-h-full p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Update Order</h1>
        <p className="text-gray-500 mt-1">
          View and update customer order details
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              ref={idRef}
              type="text"
              defaultValue={order.id}
              disabled
              className="w-full border rounded-md px-4 py-2 bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Email
            </label>
            <input
            ref={emailRef}
              type="email"
              defaultValue={order.email}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC Number
            </label>
            <input
              ref={nicRef}
              type="text"
              defaultValue={order.nic}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              ref={contactRef}
              type="text"
              defaultValue={order.contact}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              ref={addressRef}
              rows="3"
              defaultValue={order.address}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              ref={productNameRef}
              type="text"
              defaultValue={order.productName}
              disabled
              className="w-full border rounded-md px-4 py-2 bg-gray-100"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              ref={productQuantityRef}
              type="number"
              defaultValue={order.productQuantity}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Rental Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental Cost (LKR)
            </label>
            <input
              ref={rentalCostRef}
              type="number"
              defaultValue={order.rentalCost}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

         

        

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Status
            </label>
            <select
              onChange={handleSelectDiliveryStatus}
              defaultValue={order.deliveryStatus}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Images */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Profile</p>
              <img src={order.profilePic} className="rounded-md" />
            </div>
            {order.productType == "rental" ? (
              <>
                <div>
                  <p className="text-sm text-gray-600 mb-1">NIC Front</p>
                  <img src={order.nicFrontImage} className="rounded-md" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">NIC Back</p>
                  <img src={order.nicBackImage} className="rounded-md" />
                </div>
              </>
            ) : null}
            <div>
              <p className="text-sm text-gray-600 mb-1">Product</p>
              <img src={order.productImage} className="rounded-md" />
            </div>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
              className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              type="button"
              className="px-6 py-2 bg-accent text-white rounded-md hover:opacity-90"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
