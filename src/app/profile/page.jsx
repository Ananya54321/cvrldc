"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../actions/userActions";

const Page = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    designation: "",
    createdAt: "",
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
          <div className="w-32 h-32 rounded-full border-4 border-[#b08d57] overflow-hidden mb-6">
            <img
              src={user.profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#4a4a3d] mb-2">{user.name}</h1>

          <div className="space-y-3 text-[#6b5d4c] w-full max-w-md">
            <p className="text-lg">👤 {user.username}</p>
            <p className="text-lg">💼 {user.designation}</p>
            {user.createdAt && (
              <p className="text-lg">📅 Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
