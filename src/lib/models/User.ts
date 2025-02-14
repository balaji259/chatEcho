import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
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
    gender: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      default: "",
    },
    changed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
