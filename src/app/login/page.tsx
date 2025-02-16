/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status == 200) {
        toast.success("Login Success");
        router.push("/chats");
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Please set password!");
        //send otp
        const res = await axios.post(`/api/sendotp`, {email: formData.email});
        if(res.status == 200)
        {
          toast.error("Please set your password!");
          router.push(`/set-password?email=${formData.email}`);
        }
      } else if (error.response?.status === 404) {
        toast.error("User not found");
      } else {
        console.log(error.message);
        toast.error("Please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
