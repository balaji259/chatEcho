/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleLogin = async () => {
    try {
        const res = await axios.post("/api/login", { formData });
        console.log(res);
        if(res.status == 403)
            router.push("/set-password");
        else if(res.status == 404)
        {
            console.log()
            toast.error("User not found");
        }
        else if(res.status == 200)
            router.push("/chats");
    } catch (error: any) {
        console.log(error.message);
        toast.error("Please try again");
    }
  };

  return <div>LoginPage</div>;
};

export default LoginPage;
