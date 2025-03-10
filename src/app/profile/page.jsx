"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUser } from "../../../actions/userActions";
import { useRouter } from "next/navigation";
const getImageUrl = (driveLink) => {
  try {
    if (!driveLink) return "/default-profile.jpg"; // Default image

    // Extract Google Drive file ID
    const fileId = driveLink.match(/[-\w]{25,}/)?.[0];
    // Debugging

    if (!fileId) return "/default-profile.jpg"; // Fallback

    // Convert to direct image URL with timestamp to prevent caching
    return `https://drive.google.com/uc?export=view&id=${fileId}&timestamp=${new Date().getTime()}`;
  } catch (error) {
    console.error("Error processing image URL:", error);
    return "/default-profile.jpg";
  }
};

const Page = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      return router.push("/login");
    }
  }
  const [user, setUser] = useState({
    name: "",
    username: "",
    designation: "",
    createdAt: "",
    profile: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getUser(token);
          if (res.success) {
            setUser(res.user);
          } else {
            console.error(res.error);
          }
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#4a4a3d] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#f3e6d0] rounded-3xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center text-center">
          {user.profile && (
            <div className="w-32 h-32 rounded-full border-4 border-[#b08d57] overflow-hidden mb-6">
              <Image
                src={getImageUrl(user.profile)}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-profile.jpg"; // Fallback image
                }}
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-[#4a4a3d] mb-2">
            {user.name || "User Name"}
          </h1>

          <div className="space-y-3 text-[#6b5d4c] w-full max-w-md">
            <p className="text-lg">👤 {user.username || "Username"}</p>
            <p className="text-lg">💼 {user.designation || "Designation"}</p>
            {user.createdAt && (
              <p className="text-lg">
                📅 Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
