import bcryptjs from "bcryptjs";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  try {

  
    await connectDB(); 
  
    const { email, password } = await request.json();
    
    
    
    
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }






    if (!user.password || user.password.length==0) {
      console.log("set password");
      return NextResponse.json(
        { message: "Password not found" },
        { status: 403 }
      );
    }

    // const correct = await bcryptjs.compare(password, user.password);
    // if (!correct) {
    //   return NextResponse.json(
    //     { message: "Incorrect Password" },
    //     { status: 401 }
    //   );
    // }



    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } catch (err: any) {
    console.log(err?.message);
    return NextResponse.json({ message: err?.message }, { status: 500 });
  }
}
