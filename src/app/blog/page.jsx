"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { addBlog, getAllBlogs } from "../../../actions/blogActions";
import { toast } from "sonner";
const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setAllBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogs(); // Await the promise
      if (res.success) {
        setAllBlogs(res.blogs);
      } else {
        console.error(res.message);
      }
    };
  
    fetchBlogs(); // Call the async function
  }, []);
  console.log(blogs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Log in to create blog");
    }
    const res = await addBlog(title, content, token);
    if (res.success) {
      setTitle("");
      setContent("");
      setIsModalOpen(false);
      toast.success(res.message);
      const fetchBlogs = async () => {
        const res = await getAllBlogs(); // Await the promise
        if (res.success) {
          setAllBlogs(res.blogs);
        } else {
          console.error(res.message);
        }
      };
      fetchBlogs();
    } else {
      toast.error(res.message);
    }
    console.log(res);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#ECDEBC]">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#352C21] rounded-lg p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-[#BF8B41] mb-6">
              LDC Homepage
            </h1>
            <p className="text-xl mb-6 text-[#ECDEBC]">
              Welcome to the world of LDC. Explore our community and share your
              thoughts.
            </p>

            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-bold py-3 px-6 rounded-lg transition duration-300">
              Create Blog
            </button>
          </div>
        </div>
      </main>
      {
        blogs&&
        <div className="grid grid-cols-2 gap-4 mb-12">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-6">
              <h3 className="text-xl font-bold text-[#BF8B41] mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-[#ECDEBC] mb-4">
                {blog.content.slice(0, 100)}...
              </p>
              <button
                className="bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-bold py-2 px-4 rounded-lg transition duration-300">
                Read More
              </button>
            </div>
          ))}
        </div>
      }

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#352C21] rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#464936]">
              <h2 className="text-2xl font-bold text-[#BF8B41]">
                Create New Blog Post
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#ECDEBC] hover:text-[#BF8B41] transition duration-200">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#BF8B41]">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#464936] border border-[#BF8B41] focus:border-[#ECDEBC] focus:ring-1 focus:ring-[#ECDEBC] outline-none transition duration-200 text-[#ECDEBC] placeholder-[#ECDEBC]/50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-[#BF8B41]">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={6}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#464936] border border-[#BF8B41] focus:border-[#ECDEBC] focus:ring-1 focus:ring-[#ECDEBC] outline-none transition duration-200 resize-none text-[#ECDEBC] placeholder-[#ECDEBC]/50"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 px-6 py-2 rounded-lg border border-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] transition duration-200">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-bold rounded-lg transition duration-200">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
