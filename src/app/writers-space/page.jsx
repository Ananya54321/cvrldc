"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, PenTool } from "lucide-react";
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

export default function WritersSpacePage() {
  const vertical = "writers-space";
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
            <Badge className="mb-4 bg-accent/20 text-accent hover:scale-105 transition-transform px-4 py-1 text-sm">
              Write • Inspire • Share
            </Badge>
            <h1 className="titlefont text-6xl md:text-7xl mb-4 text-accent">
              Writer's Space
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A creative hub for writers to connect, collaborate, and craft
              their stories
            </p>
            <div className="h-1 w-32 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="mb-10 text-secondary/80">
              Explore workshops, writing prompts, feedback circles, and
              collaborative opportunities designed to nurture your creative
              expression.
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
              <Button
                asChild
                variant="primary"
                size="lg"
                className="border-accent bg-primary text-accent hover:scale-105 transition-transform border">
                <Link href="/blog" className="flex items-center gap-2">
                  <PenTool size={20} />
                  Submit Work
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

      {/* Writer's Resources Section */}
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
                  Resources
                </Badge>
                <h2 className="titlefont text-4xl mb-4 text-accent">
                  Writer's Resources
                </h2>
                <p className="mb-6 text-secondary/80">
                  Access creative prompts, craft workshops, and feedback circles
                  to enhance your writing skills and connect with fellow
                  writers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    variant="primary"
                    className="bg-accent hover:scale-105 transition-transform  text-primary">
                    <Link
                      href="https://nationalcentreforwriting.org.uk/get-involved/writers/resources/?gad_source=1&gclid=Cj0KCQiAlbW-BhCMARIsADnwasplwosKXmKvp0_D-K67ZPT2UJURGB862nmPt8_mntM366OjcqonNYEaArzyEALw_wcB"
                      target="_blank">
                      Browse Resources
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="primary"
                    className="border-white text-white bg-ternary hover:scale-105 transition-transform">
                    <Link href="/blog">Submit Your Work</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-secondary/10 p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">
                      Writing Prompts
                    </h3>
                    <p>
                      Daily inspiration to spark your creativity and overcome
                      writer's block.
                    </p>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2">
                      Craft Workshops
                    </h3>
                    <p>
                      Expert guidance on narrative structure, character
                      development, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
