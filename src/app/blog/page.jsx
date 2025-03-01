"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, X } from "lucide-react";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../../../actions/blogActions";
import { toast } from "sonner";
const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setAllBlogs] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    if (!token) {
      return toast.error("Log in to delete blog");
    }
    const res = await deleteBlog(id, token);
    if (res.success) {
      toast.success(res.message);
      fetchBlogs();
    } else {
      toast.error(res.message);
    }
  };

  const [editingBlogId, setEditingBlogId] = useState(null);

  const handleUpdate = (id, t, c) => {
    setEditingBlogId(id);
    setTitle(t);
    setContent(c);
    setIsModalOpen(true);
  };

  const fetchBlogs = async () => {
    const res = await getAllBlogs();
    if (res.success) {
      setAllBlogs(res.blogs);
    } else {
      console.error(res.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Log in to create or edit a blog");
    }

    let res;
    if (editingBlogId) {
      res = await updateBlog(editingBlogId, title, content, token);
    } else {
      res = await addBlog(title, content, token);
    }

    if (res.success) {
      setTitle("");
      setContent("");
      setIsModalOpen(false);
      setEditingBlogId(null);
      toast.success(res.message);
      fetchBlogs();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECDEBC]">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#352C21] rounded-lg p-8 shadow-xl">
            <h1 className="text-4xl titlefont font-bold text-[#BF8B41] mb-6">
              LDC Community Blog
            </h1>
            <p className="text-xl mb-6 text-[#ECDEBC]">
              Share your thoughts, connect with others, and explore diverse
              perspectives in our vibrant community.
            </p>

            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-bold py-3 px-6 rounded-lg transition duration-300">
              Share Your Story
            </button>
          </div>
        </div>

        {blogs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#352C21] rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-102">
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#BF8B41] flex items-center justify-center">
                      <img
                        src={
                          blog.createdBy?.avatar ||
                          `https://ui-avatars.com/api/?name=${
                            blog.createdBy?.username || "Anonymous"
                          }&background=BF8B41&color=fff`
                        }
                        alt="Author"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-[#BF8B41] font-semibold">
                        {blog.createdBy?.username || "Anonymous"}
                      </h4>
                      <div className="flex items-center text-sm text-[#ECDEBC]/70">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(blog.createdAt)}</span>
                        <Clock size={14} className="ml-3 mr-1" />
                        <span>{formatTime(blog.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <h3 className="text-2xl font-bold text-[#BF8B41] mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-[#ECDEBC] mb-4">
                    {expandedBlog === blog._id
                      ? blog.content
                      : `${blog.content.slice(0, 150)}...`}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={() =>
                          setExpandedBlog(
                            expandedBlog === blog._id ? null : blog._id
                          )
                        }
                        className="bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-semibold py-2 px-4 rounded-lg transition duration-300">
                        {expandedBlog === blog._id ? "Show Less" : "Read More"}
                      </button>

                      {blog.createdBy &&
                        user &&
                        blog.createdBy._id === user._id && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="text-[#BF8B41] hover:text-[#ECDEBC] hover:bg-[#BF8B41] px-4 py-2 rounded-lg border-2 border-[#BF8B41] transition duration-300">
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                handleUpdate(blog._id, blog.title, blog.content)
                              }
                              className="text-[#BF8B41] hover:text-[#ECDEBC] hover:bg-[#BF8B41] px-4 py-2 rounded-lg border-2 border-[#BF8B41] transition duration-300">
                              Edit
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#352C21] rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#464936]">
              <h2 className="text-2xl font-bold text-[#BF8B41]">
                {editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBlogId(null);
                  setTitle("");
                  setContent("");
                }}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-primary/20 border border-[#BF8B41] focus:border-[#ECDEBC] focus:ring-1 focus:ring-[#ECDEBC] outline-none transition duration-200 text-[#ECDEBC] placeholder-[#ECDEBC]/50"
                  placeholder="Enter your blog title"
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-primary/20 border border-[#BF8B41] focus:border-[#ECDEBC] focus:ring-1 focus:ring-[#ECDEBC] outline-none transition duration-200 resize-none text-[#ECDEBC] placeholder-[#ECDEBC]/50"
                  placeholder="Share your thoughts..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBlogId(null);
                    setTitle("");
                    setContent("");
                  }}
                  className="mr-4 px-6 py-2 rounded-lg border border-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] transition duration-200">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#BF8B41] hover:bg-[#464936] text-[#ECDEBC] font-bold rounded-lg transition duration-200">
                  {editingBlogId ? "Update Post" : "Publish Post"}
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
