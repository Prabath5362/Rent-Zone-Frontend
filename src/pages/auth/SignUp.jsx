import React, { useRef, useState } from "react";
import bgImage from "../../assets/images/background.png";
import Imageinput from "../../components/admin/Imageinput";
import toast from "react-hot-toast";
import axios from "axios";
import { ServerConstant } from "../../utils/ServerConstant";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

function RegisterSliderUI() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState("");
 

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const nicRef = useRef("");
  const addressRef = useRef("");
  const contactNumberRef = useRef("");

  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {

    setState("loading");
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast("Passwords do not match", { type: "error" });
      setState("");
      return;

    }

    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      nicRef.current.value === "" ||
      addressRef.current.value === "" ||
      contactNumberRef.current.value === ""
    ) {
      toast("Please fill all the fields", { type: "error" });
      setState("");
      return;
    }

    if (imageUrl === "") {
      toast("Please upload a profile picture", { type: "error" });
      setState("");
      return;
    }

    try {
      const registerData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        firstname: firstNameRef.current.value,
        lastname: lastNameRef.current.value,
        nic: nicRef.current.value,
        address: addressRef.current.value,
        contact: contactNumberRef.current.value,
        profilePic: imageUrl,
      };

      const response = await axios.post(
        ServerConstant.baseUrl + ServerConstant.auth.register,
        registerData,
      );

      setState("success");
      toast("Registration successful! Please login.", { type: "success" });
      navigate("/login");
    } catch (error) {
      setState("error");
      toast(error.response?.data?.message || "Registration failed", {
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Sliding Registration Card */}
      <form
        action=""
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20  flex flex-col justify-center "
      >
         { 

          state === "loading" ?
          <div className="absolute bg-black/50 w-full h-full left-0 top-0 rounded-2xl  transform transition-transform duration-500 flex items-center justify-center">

            <BounceLoader color="#FF204E"/>
          </div> : null
          
        }
          
        
          <h1 className="text-2xl font-bold text-white text-center">
            Create Account
          </h1>
          <p className="text-gray-200 text-center mt-1 text-sm">
            Fill in your details
          </p>

          <div className="mt-6">
            {/* Step 1 */}

            <div className={step == 1 ? "space-y-3 animate-slideIn" : "hidden"}>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-100 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                    ref={firstNameRef}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-100 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                    ref={lastNameRef}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-100 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={emailRef}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-100 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={passwordRef}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-100 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={confirmPasswordRef}
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-accent text-white py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm mt-2"
              >
                Next
              </button>
            </div>

            <div className={step == 2 ? "space-y-3 animate-slideIn" : "hidden"}>
              <Imageinput  setImageUrl={setImageUrl}/>

              <div>
                <label className="block text-xs text-gray-100 mb-1">NIC</label>
                <input
                  type="text"
                  placeholder="123456789V"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={nicRef}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-100 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="123 Street, City"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={addressRef}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-100 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="+94 7XXXXXXXX"
                  className="w-full px-3 py-2 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg"
                  ref={contactNumberRef}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition text-sm"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-accent text-white py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

      </form>
    </div>
  );
}

export default RegisterSliderUI;
