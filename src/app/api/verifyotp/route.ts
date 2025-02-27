/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { Otp } from "@/lib/models/Otp";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, otp, password } = body;

    const Present = await Otp.findOne({
      email: email,
      otp: otp,
      expiry: { $gt: Date.now() },
    });
    if (!Present) {
      return NextResponse.json(
        { message: "OTP not found or OTP expired! Please login again" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email: email });
    user.password = password;
    await user.save();

    return NextResponse.json(
      { message: "User Verification and Password reset Successfull!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
