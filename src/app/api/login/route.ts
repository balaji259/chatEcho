/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import connectDB from "@/lib/db";
// import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.password || user.password.length == 0) {
      console.log("set password");
      return NextResponse.json(
        { message: "Password not found", email },
        { status: 403 }
      );
    }

    const correct = await password == user.password;
    if (!correct) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: "30d" });

    const response = NextResponse.json({ message: "Login Successful", user }, { status: 200 });
    response.cookies.set("token", token);

    return response;
  } catch (err: any) {
    console.log(err?.message);
    return NextResponse.json({ message: err?.message }, { status: 500 });
  }
}
