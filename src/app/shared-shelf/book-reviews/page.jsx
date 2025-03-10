"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { Plus, Compass } from "lucide-react";
import CreateCommunityModal from "@/components/pages/community/CommunityForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCommunities, createCommunity } from "@/../actions/communityActions";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/../actions/userActions";
import CommunityCard from "@/components/pages/community/CommunityCard";

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    if (typeof window !== "undefined") {
      const jwttoken = localStorage.getItem("token");
      if (jwttoken) {
        try {
          const res = await verifyUser(jwttoken);
          if (res.success) {
            setIsLoggedIn(true);
            setUser(JSON.parse(res.user));
            setToken(jwttoken);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Auth verification error:", error);
          setIsLoggedIn(false);
        }
      } else {
        // Optional: Uncomment if you want to force login
        // toast.message("Please login to access all features");
        // router.push("/login");
        setIsLoggedIn(false);
      }

      // Fetch communities regardless of login status
      await fetchCommunities();
    }
  };

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await getCommunities();
      if (response.success) {
        setCommunities(response.communities);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      toast.error("Failed to fetch communities");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCommunity = async (data) => {
    try {
      const jwttoken = localStorage.getItem("token");
      if (!jwttoken) {
        toast.error("Please login to create a community");
        router.push("/login");
        return;
      }

      const response = await createCommunity(data, jwttoken);
      if (response.success) {
        toast.success(response.message);
        fetchCommunities();
        setIsCreateModalOpen(false);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Failed to create community");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-48 mx-auto bg-black/10" />
            <Skeleton className="h-4 w-64 mx-auto bg-black/10" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 w-full bg-black/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Communities
          </h1>
          <p className="mt-2 text-black/60">
            Join communities and connect with others
          </p>

          {/* Always show the button but handle login check when clicked */}
          <Button
            onClick={() => {
              if (isLoggedIn) {
                setIsCreateModalOpen(true);
              } else {
                toast.error("Please login to create a community");
                router.push("/login");
              }
            }}
            className="mt-6 bg-black text-white hover:bg-black/90 transition-colors"
            size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create your own Community
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button
            variant={"ghost"}
            className={"bg-black text-white hover:bg-black/90"}>
            <Compass className="mr-2 h-4 w-4" />
            Explore
          </Button>
        </div>

        <Separator className="mb-8 bg-black/10" />

        {/* Display communities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.length > 0 ? (
            communities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                currentUser={user}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No communities found. Create one to get started!
              </p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isCreateModalOpen && (
            <CreateCommunityModal
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onSubmit={handleCreateCommunity}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
