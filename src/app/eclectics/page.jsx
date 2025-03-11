"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, PenTool } from "lucide-react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { verifyUser } from "../../../actions/userActions";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function EclecticsPage() {
  const vertical = "eclectics";
  const heroRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const setAuthStatus = () => {
    if (typeof window !== "undefined") {
      const jwttoken = localStorage.getItem("token");
      verifyUser(jwttoken).then((res) => {
        if (res.success) {
          setIsLoggedIn(true);
          setUser(JSON.parse(res.user));
          console.log("User logged in");
          setToken(jwttoken);
        } else {
          setIsLoggedIn(false);
          console.log("User not logged in");
        }
      });
    }
  };

  useEffect(() => {
    setAuthStatus();
  }, []);

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroElement = heroRef.current;
        const heroBackground = heroElement.querySelector(".hero-background");

        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrollY * 0.4}px)`;
          heroBackground.style.opacity = `${0.1 - scrollY * 0.002}`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-secondary text-primary">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-primary text-secondary py-20 md:py-32">
        <div
          className="absolute inset-0 opacity-10 hero-background"
          style={{
            backgroundImage: `url(${"/eclectics-bg.jpeg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}>
            <Badge className="mb-4 bg-accent/20 text-accent hover:scale-105 transition-transform px-4 py-1 text-sm">
              Explore • Create • Connect
            </Badge>
            <h1 className="titlefont text-6xl md:text-7xl mb-4 text-accent">
              Eclectics
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Where ideas meet creativity, knowledge meets passion
            </p>
            <div className="h-1 w-32 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="mb-10 text-secondary/80">
              Explore the world of literature, quizzes, debates, and
              intellectual discourse in our diverse collection of events and
              activities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="primary"
                className="bg-accent hover:scale-105 transition-transform text-primary">
                <Link href="#events" className="flex items-center gap-2">
                  <CalendarDays size={20} />
                  Explore Events
                </Link>
              </Button>
              {isLoggedIn && (
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="border border-yellow-500/40 bg-primary text-accent hover:scale-105 transition-transform hover:text-accent">
                  <Link
                    href="/eclectics/create-quiz"
                    className="flex items-center gap-2">
                    <PenTool size={20} />
                    Create Quiz
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            className=" p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}>
            <FilteredEvents vertical={vertical} />
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-16 bg-ternary text-secondary relative">
        <div className="container mx-auto px-4 pt-8">
          <motion.div
            className="bg-primary backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-accent/20 text-accent hover:scale-105 transition-transform">
                  Interactive
                </Badge>
                <h2 className="titlefont text-4xl mb-4 text-accent">
                  Quiz Platform
                </h2>
                <p className="mb-6 text-secondary/80">
                  Test your knowledge or challenge your friends with our
                  collection of quizzes. From literature and arts to science and
                  pop culture, we have something for everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  {isLoggedIn && (
                    <Button
                      asChild
                      variant="primary"
                      className="bg-accent hover:scale-105 transition-transform text-primary">
                      <Link href="/eclectics/create-quiz">Create a Quiz</Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="primary"
                    className="border-white text-white bg-ternary hover:scale-105 transition-transform">
                    <Link
                      href={`${isLoggedIn ? "/eclectics/quizzes" : "/login"}`}>
                      Take a Quiz
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
