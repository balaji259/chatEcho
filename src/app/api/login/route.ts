import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/User";

export async function post(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const correct = await user.comparePassword(password);
  if (!correct) {
    return NextResponse.json(
      { message: "Incorrect Password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "Login Successful" }, { status: 200 });

}
