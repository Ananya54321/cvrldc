"use server";
import Blog from "../models/blog";
import jwt from "jsonwebtoken";
import connectDB from "../utils/db";
import User from "../models/user";

export async function addBlog(title, content, token) {
  try {
    await connectDB();
    console.log(token);
    if (!token) {
      return { success: false, message: "Please login to create a blog" };
    }
    const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const createdBy = decoded.id;
    const blog = new Blog({ title, content, createdBy });
    await blog.save();
    return { success: true, message: "Blog added successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function getAllBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("createdBy"); // Convert to plain objects
    return { success: true, blogs: JSON.parse(JSON.stringify(blogs)) };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
export async function deleteBlog(id, token) {
  try {
    await connectDB();
    console.log(token);
    if (!token) {
      return { success: false, message: "Please login to delete a blog" };
    }
    const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const createdBy = decoded.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }
    if (blog.createdBy.toString() !== createdBy) {
      return {
        success: false,
        message: "You are not authorized to delete this blog",
      };
    }
    await Blog.findByIdAndDelete(id);
    return { success: true, message: "Blog deleted successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function updateBlog(id, title, content, token) {
  try {
    await connectDB();
    console.log(token);
    if (!token) {
      return { success: false, message: "Please login to update a blog" };
    }
    const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const createdBy = decoded.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }
    if (blog.createdBy.toString() !== createdBy) {
      return {
        success: false,
        message: "You are not authorized to update this blog",
      };
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    return { success: true, message: "Blog updated successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
