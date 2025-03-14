"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, BookOpen } from "lucide-react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import EditEvents from "@/components/pages/events/EditEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function SharedShelfPage() {
  const vertical = "shared-shelf";
  const heroRef = useRef();

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
            backgroundImage: `url(${"/shared-bg.jpeg"})`,
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
              Read • Share • Discover
            </Badge>
            <h1 className="titlefont text-6xl md:text-7xl mb-4 text-accent">
              Shared Shelf
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Where book lovers unite, ideas flourish, and stories come alive
            </p>
            <div className="h-1 w-32 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="mb-10 text-secondary/80">
              Explore our collection of book clubs, reading sessions, author
              talks, and literary discussions designed to expand your horizons.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="bg-accent hover:scale-105 transition-transform text-primary">
                <Link href="#events" className="flex items-center gap-2">
                  <CalendarDays size={20} />
                  Browse Events
                </Link>
              </Button>
              <Button
                asChild
                variant="primary"
                size="lg"
                className="border border-yellow-500/40 bg-primary text-accent hover:scale-105  transition-transform ">
                <Link
                  href="/shared-shelf/book-reviews"
                  className="flex items-center gap-2">
                  <BookOpen size={20} />
                  Recommend Books
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            className="p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}>
            <FilteredEvents vertical={vertical} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
