import React, { useRef, useState } from "react";
import bgImage from "../../assets/images/background.png";
import axios from "axios";
import toast from "react-hot-toast";
import { ServerConstant } from "../../utils/ServerConstant";
import { data, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BounceLoader } from "react-spinners";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setState("loading");
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      toast("Please fill all the fields", { type: "error" });
      setState("");
      return;
    }

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        ServerConstant.baseUrl + ServerConstant.auth.login,
        loginData,
      );
      localStorage.setItem("token", response.data.token);
      toast("Login Success !", { type: "success" });

      const token = localStorage.getItem("token");
      if (!token) {
        toast("Login First !", { type: "error" });
        setState("");
        return;
      }

      const userData = jwtDecode(token);
      
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setState("success");
      if (userData.role == "admin") {
        navigate("/admin");
      } else if (userData.role == "customer") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setState("error");
      toast(error.response?.data?.message || "Login Failed !", {
        type: "error",
      });
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        { 

          state === "loading" ?
          <div className="absolute bg-black/50 w-full h-full left-0 top-0 rounded-2xl  transform transition-transform duration-500 flex items-center justify-center">

            <BounceLoader color="#FF204E"/>
          </div> : null
          
        }

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-200 text-center mt-2">Login to your account</p>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Email
            </label>
            <input
              type="email"
              required={true}
              ref={emailRef}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Password
            </label>
            <input
              type="password"
              required={true}
              ref={passwordRef}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="accent-accent" />
              Remember me
            </label>
            <a href="#" className="text-accent hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
