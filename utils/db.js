import mongoose from "mongoose";
const MONGO_URI = process.env.NEXT_PUBLIC_MONGOURI;

export default async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected!");
  } catch (e) {
    console.log("Error caught while connecting to DB ", e);
  }
}
