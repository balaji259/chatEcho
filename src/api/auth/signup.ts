/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import connectDB from "../../lib/db.ts";
import { User } from "../../lib/models/User.ts";
import data from "../../utils/data.json";

export default async function handler() {
  await connectDB();
  try {
    const bros = data.map(({ ID, NAME, GENDER, BRANCH, Image }) => ({
      id: ID,
      name: NAME || "",
      gender: GENDER || "",
      branch: BRANCH || "",
      image: Image || "",
      email: `rr${ID.split("R")[1]}@rguktrkv.ac.in`,
    }));

    await User.deleteMany()
      .then(() => {
        console.log("Users deleted successfully!");
      })
      .catch((err) => {
        console.error("Error inserting users:", err);
      });

    await User.insertMany(bros)
      .then(() => {
        console.log("Users inserted successfully!");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error inserting users:", err);
      });
      
    console.log("Poor");
  } catch (error) {
    console.log("Rich");
  }
}

handler();
