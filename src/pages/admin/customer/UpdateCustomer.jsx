import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { ServerConstant } from "../../../utils/ServerConstant";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploadService from "../../../services/ImageUploadService";
import { jwtDecode } from "jwt-decode";

function UpdateCustomer() {
  const emailRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const nicRef = useRef("");
  const addressRef = useRef("");
  const contactRef = useRef("");

  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state;

  const [profilePic, setProfilePic] = useState(customer.profilePic);
  const [imageLoading, setImageLoading] = useState(false);
  const [state, setState] = useState("");

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    setState("loading");

    const customerData = {
        email: customer.email,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      nic: nicRef.current.value,
      address: addressRef.current.value,
      contact: contactRef.current.value,
      profilePic: profilePic,
    };

    if (
      !customerData.firstname ||
      !customerData.lastname ||
      !customerData.nic ||
      !customerData.address ||
      !customerData.contact ||
      !customerData.profilePic
    ) {
      toast.error("Please fill all fields");
      setState("");
      return;
    }

    console.log(customerData);
    

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        setState("");
        return;
      }
      console.log( ServerConstant.baseUrl +
          ServerConstant.admin.customer.update);
     const response =  await axios.put(
        ServerConstant.baseUrl +
          ServerConstant.admin.customer.update,
        customerData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      
      
      toast.success("Customer updated successfully");
      setState("success");
      navigate("/admin/customer");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data?.message || error.message);
      setState("error");
    }
  };

  const handleImageSelect = async (e) => {
    setImageLoading(true);
    try {
      const url = await ImageUploadService(e.target.files[0]);
      setProfilePic(url);
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-full p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Update Customer
        </h1>
        <p className="text-gray-500 mt-1">Update registered customer details</p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-6 relative">
        {state === "loading" && (
          <div className="absolute bg-black/40 w-full h-full top-0 left-0 rounded-xl flex items-center justify-center">
            <BounceLoader />
          </div>
        )}

        <form
          onSubmit={handleUpdateCustomer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
                disabled
              ref={emailRef}
              defaultValue={customer.email}
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent opacity-50 cursor-not-allowed"
            />
          </div>
 {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              ref={firstnameRef}
              defaultValue={customer.firstname}
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              ref={lastnameRef}
              defaultValue={customer.lastname}
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* NIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC
            </label>
            <input
              ref={nicRef}
              defaultValue={customer.nic}
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              ref={contactRef}
              defaultValue={customer.contact}
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              ref={addressRef}
              defaultValue={customer.address}
              rows="3"
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-accent transition">
              {imageLoading ? (
                <BounceLoader color="#FF204E" />
              ) : profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" size={28} />
                  <p className="text-gray-500 text-sm">
                    Click to upload profile image
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/customers")}
              className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-md hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCustomer;
