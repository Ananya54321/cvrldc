"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, FlaskRound } from "lucide-react";
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

export default function STPPage() {
  const vertical = "stp";
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
            backgroundImage: `url(${"/writers-bg.jpeg"})`,
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
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30 px-4 py-1 text-sm">
              Inspire • Engage • Communicate
            </Badge>
            <h1 className="titlefont text-6xl md:text-7xl mb-4 text-accent">
              STP
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Story Telling and Public Speaking
            </p>
            <div className="h-1 w-32 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="mb-10 text-secondary/80">
              Explore inspiring events, workshops, and discussions that enhance
              your storytelling and public speaking skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/80 text-primary">
                <Link href="#events" className="flex items-center gap-2">
                  <CalendarDays size={20} />
                  Explore Events
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent bg-primary text-accent hover:bg-accent/10 hover:text-accent">
                <Link href="/stp/projects" className="flex items-center gap-2">
                  <FlaskRound size={20} />
                  View Projects
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

      {/* Innovation Showcase Section */}
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
                <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
                  Innovations
                </Badge>
                <h2 className="titlefont text-4xl mb-4 text-accent">
                  Storytelling Showcase
                </h2>
                <p className="mb-6 text-secondary/80">
                  Discover groundbreaking storytelling projects and public
                  speaking innovations from our community. From motivational
                  speeches to creative storytelling, see how communication is
                  shaping our future.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-accent hover:bg-white/30 hover:text-white text-primary">
                    <Link href="/stp/projects">View Projects</Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    className="border-white text-white bg-ternary hover:bg-white/30">
                    <Link href="/stp/submit-project">Submit Project</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-secondary/10 p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">
                      Storytelling Workshops
                    </h3>
                    <p>
                      Hands-on sessions to learn and experiment with the art of
                      storytelling.
                    </p>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">
                      Public Speaking Sessions
                    </h3>
                    <p>
                      Interactive sessions to hone your public speaking skills
                      and confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admin Section */}
      {/* <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-primary p-8 md:p-12 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}>
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
              Administration
            </Badge>
            <h2 className="titlefont text-4xl mb-4 text-accent">
              Manage Events
            </h2>
            <p className="mb-8 text-secondary">
              For administrators: Add, edit, or remove STP events.
            </p>
            <EditEvents vertical={vertical} />
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
