"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAllPosts,
  createPost,
  createComment,
} from "@/../actions/communityPostActions";
import { toast } from "sonner";
import PostCard from "@/components/pages/community/PostCard";
import PostForm from "@/components/pages/community/PostForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { verifyUser } from "@/../actions/userActions";

function CommunityPage() {
  const params = useParams();
  const communityId = params.id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setAuthStatus();
    fetchPosts();
  }, []);

  const setAuthStatus = () => {
    if (typeof window !== "undefined") {
      const jwttoken = localStorage.getItem("token");
      verifyUser(jwttoken).then((res) => {
        if (res.success) {
          setIsLoggedIn(true);
          setUser(JSON.parse(res.user));
          setToken(jwttoken);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts(communityId);
      if (response.success) {
        setPosts(response.posts || []);
      } else {
        console.warn("No posts found:", response.error);
        // Don't show error toast for empty communities
        if (response.error !== "No posts found for this community") {
          toast.error(response.error || "Failed to fetch posts");
        }
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    if (!token) {
      toast.error("Please login to create a post");
      return;
    }

    try {
      const response = await createPost(communityId, postData, token);
      if (response.success) {
        toast.success("Post created successfully!");
        fetchPosts();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const handleComment = (postId) => {
    setActivePostId(postId);
  };

  const handleCancelComment = () => {
    setActivePostId(null);
  };

  const handleSubmitComment = async (postId, commentText) => {
    if (!token) {
      toast.error("Please login to comment");
      return;
    }

    if (!commentText || commentText.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await createComment(postId, commentText.trim(), token);
      if (response.success) {
        toast.success("Comment posted successfully!");
        fetchPosts(); // Refresh comments
        setActivePostId(null);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isLoggedIn ? (
        <PostForm onSubmit={handleCreatePost} />
      ) : (
        <Alert className="mb-8 border-[#dc2446] bg-white">
          <AlertDescription className="text-black">
            Login to create posts and participate in discussions!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onComment={handleComment}
              isCommenting={activePostId === post._id}
              onCancelComment={handleCancelComment}
              onSubmitComment={(commentText) =>
                handleSubmitComment(post._id, commentText)
              }
            />
          ))
        ) : (
          <Card className="bg-white">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <p className="text-lg text-gray-500">
                No posts in this community yet. Be the first to create one!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CommunityPage;
