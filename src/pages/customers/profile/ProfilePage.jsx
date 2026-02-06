import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ServerConstant } from '../../../utils/ServerConstant';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [state, setState] = useState("loading");

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const nicRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setState("error");
      return;
    }

    try {
      const response = await axios.get(ServerConstant.baseUrl + ServerConstant.customer.user.get, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setUser(response.data.user);
      setState("success");
    } catch (error) {
      setState("error");
      console.log(error.response?.data?.message || "Error fetching profile");
      toast.error("Something went wrong");
    }
  };


  const updateProfile = async () => {
    setState("loading");
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const updatedData = {
        firstname: firstnameRef.current.value,
        lastname: lastnameRef.current.value,
        email: emailRef.current.value,
        nic: nicRef.current.value,
        contact: contactRef.current.value,
        address: addressRef.current.value,
      };

      const response = await axios.put(ServerConstant.baseUrl+ ServerConstant.customer.user.put, updatedData, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      toast.success("Profile updated successfully");
      fetchProfile();
      setState("success");
      window.location.reload();
    } catch (error) { 
      console.log(error.response?.data?.message || "Error updating profile");
      toast.error("Failed to update profile");
      setState("error");

    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Profile Overview */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user?.profilePic || "https://i.ibb.co/NdrFXCJK/Pngtree-man-avatar-image-for-profile-13001882.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {user?.firstname} {user?.lastname}
                </h2>
                <p className="text-gray-600">{user?.role || "Customer"}</p>

                {/* Contact Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">NIC:</span>
                    <span>{user?.nic}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Contact:</span>
                    <span>{user?.contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-700">Address:</span>
                    <span>{user?.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Editable Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                    ref={firstnameRef}
                      type="text"
                      defaultValue={user?.firstname}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                    ref={lastnameRef}
                      type="text"
                      defaultValue={user?.lastname}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                  ref={emailRef}
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIC</label>
                  <input
                    ref={nicRef}
                    type="text"
                    defaultValue={user?.nic}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                  <input
                    ref={contactRef}
                    type="tel"
                    defaultValue={user?.contact}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    ref={addressRef}
                    type="text"
                    rows={3}
                    defaultValue={user?.address}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="flex justify-end">
                  <button onClick={updateProfile} className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
