"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, Clock, Mail, User, BookOpen } from "lucide-react";
import { viewBlog } from "../../../../actions/blogActions";
import LoadingAnimation from "@/components/loading";

function ViewBlog({ params }) {
  const { id } = React.use(params);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await viewBlog(id);
    if (res.success) {
      console.log(res.blog);
      setBlog(res.blog);
    } else {
      toast.error(res.message);
    }
  };

  if (!blog) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex-col md:flex">
      {/* Fixed Image Section - Left Side */}
      <div className="md:w-1/2 md:fixed md:left-6 md:top-48 m-auto">
        <img
          src={
            blog.image ||
            "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1974"
          }
          alt={blog.title}
          className="w-full  object-cover"
        />
      </div>

      {/* Scrollable Content Section - Right Side */}
      <div className="md:w-1/2 ml-auto p-8 lg:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-[#2c1810] mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-[#3d2517] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#f5e6d3]" />
            </div>
            <div className="ml-4">
              <div className="text-sm text-[#2c1810]">Written by</div>
              <div className="text-base font-medium text-[#2c1810]">
                {blog.createdBy.username}
              </div>
            </div>
            <div className="ml-6 pl-6 border-l border-[#3d2517]">
              <div className="text-sm text-[#2c1810]">Published on</div>
              <div className="text-base text-[#2c1810]">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="prose max-w-none text-[#2c1810] mb-12">
            <p className="leading-relaxed text-lg">{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
