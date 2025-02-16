/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SetPasswordPage = () => {
  const email = window.location.search.split("=")[1];
  console.log(email);
  const [formData, setFormData] = useState({ password: "", otp: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const verifyOTP = async () => {
  //     await axios.post(`/api/verifyotp`, {
  //       email: email,
  //       otp: formData.otp,
  //       password: formData.password,
  //     });
  //   };

  const handleVerify = async () => {
    try {
      if (formData.password.length < 7) {
        toast.error("Password must be at least 7 characters");
        return;
      }
      if (formData.otp.length < 6 || formData.otp.length > 6) {
        toast.error("OTP must be 6 characters only");
        return;
      }

      const res = await axios.post("/api/verifyotp", {
        email: email,
        otp: formData.otp,
        password: formData.password,
      });
      if (res.status == 200) {
        toast.success("Verified Successfully");
        router.push("/chats");
      } else if (res.status == 404) {
        toast.error("OTP expired or not found");
        toast.error("Please Login again!");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //   useEffect(() => {
  //     if (formData.otp.length == 6) {
  //       verifyOTP();
  //     }
  //   }, [formData.otp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Verify
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="otp"
            placeholder="Enter OTP..."
            value={formData.otp}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            // max={6}
            // maxLength={6}
          />
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;
