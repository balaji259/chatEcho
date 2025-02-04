import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@(rguktrkv\.ac\.in|rguktn\.ac\.in|rguktong\.ac\.in|rguktsklm\.ac\.in)$/,
        "Please enter a valid RGUKT email address",
      ],
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
module.exports = User;