"use server";
import Community from "../models/community";
import User from "../models/user";
import connectDB from "../utils/db";
import jwt from "jsonwebtoken";

export async function getCommunities() {
  try {
    await connectDB();
    const communities = await Community.find()
      .populate("admin", "username")
      .lean();

    const formattedCommunities = communities.map((community) => ({
      ...community,
      _id: community._id?.toString() || "",
      admin: community.admin
        ? {
            _id: community.admin._id?.toString() || "",
            username: community.admin.username || "Unknown",
          }
        : null,

      posts: Array.isArray(community.posts)
        ? community.posts.map((post) => ({
            ...post,
            _id: post._id?.toString() || "",
          }))
        : [],
    }));

    return { success: true, communities: formattedCommunities };
  } catch (err) {
    console.error("Error in getCommunities:", err);
    return { success: false, error: err.message };
  }
}

export async function createCommunity(communityData, token) {
  try {
    await connectDB();

    if (!token) {
      throw new Error("Authentication token is required");
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      throw new Error("Invalid authentication token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }

    const community = new Community({
      ...communityData,
      admin: user._id,
      posts: [], // Initialize with empty posts array
    });

    await community.save();

    return {
      success: true,
      message: "Community created successfully!",
      community: {
        ...community.toObject(),
        _id: community._id.toString(),
        admin: {
          _id: user._id.toString(),
          username: user.username,
        },
      },
    };
  } catch (err) {
    console.error("Error in createCommunity:", err);
    return { success: false, error: err.message };
  }
}
