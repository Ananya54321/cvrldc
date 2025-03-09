"use server";
import Gallery from "../models/gallery";
import connectDB from "../utils/db";

connectDB();
export const getGalleries = async () => {
  try {
    const galleries = await Gallery.find().lean(); // Use .lean() for plain objects

    return {
      success: true,
      galleries: galleries.map((gallery) => ({
        ...gallery,
        id: gallery._id.toString(), // Convert _id to string
      })),
    };
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return { success: false, error: error.message };
  }
};


export const createGallery = async (event) => {
  try {
    const gallery = new Gallery({
      title: event.title,
      images: event.images,
      vertical: event.vertical,
      date: event.date, // Fix casing (was event.Date)
    });

    const savedGallery = await gallery.save();
    return {
      success: true,
      message: "Gallery created successfully",
      gallery: savedGallery.toObject(), // ✅ Convert Mongoose object to plain JS object
    };
  } catch (error) {
    console.error("Error creating gallery:", error);
    return { success: false, message: "Something went wrong" };
  }
};
