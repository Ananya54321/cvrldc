"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  PenTool,
  Brain,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import FilteredEvents from "@/components/pages/events/FilteredEvents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function EclecticsPage() {
  const vertical = "eclectics";
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
          heroBackground.style.opacity = `${1 - scrollY * 0.002}`;
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
        <div className="absolute inset-0 opacity-20 hero-background">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=1800')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}>
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30 px-4 py-1 text-sm">
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
                className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                <Link
                  href="/eclectics/create-quiz"
                  className="flex items-center gap-2">
                  <PenTool size={20} />
                  Create Quiz
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-secondary"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
          }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
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
      <section className="py-16 bg-primary text-secondary relative">
        <div
          className="absolute top-0 left-0 w-full h-16 bg-white"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          }}></div>

        <div className="container mx-auto px-4 pt-8">
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
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
                  <Button
                    asChild
                    className="bg-accent hover:bg-accent/80 text-primary">
                    <Link href="/eclectics/create-quiz">Create a Quiz</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white/10">
                    <Link href="/eclectics/quizzes">Take a Quiz</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>

                <Tabs
                  defaultValue="popular"
                  className="bg-ternary rounded-lg p-6 relative">
                  <TabsList className="grid w-full grid-cols-2 mb-4 bg-ternary/50">
                    <TabsTrigger
                      value="popular"
                      className="data-[state=active]:bg-accent data-[state=active]:text-primary">
                      Popular
                    </TabsTrigger>
                    <TabsTrigger
                      value="new"
                      className="data-[state=active]:bg-accent data-[state=active]:text-primary">
                      New
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="popular" className="mt-0">
                    <h3 className="titlefont text-2xl mb-3">
                      Popular Categories
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Literary Classics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Pop Culture & Media</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>History & Mythology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Science & Technology</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Arts & Entertainment</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="new" className="mt-0">
                    <h3 className="titlefont text-2xl mb-3">New Additions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-accent/50 text-accent">
                          NEW
                        </Badge>
                        <span>Contemporary Fiction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-accent/50 text-accent">
                          NEW
                        </Badge>
                        <span>Environmental Sciences</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-accent/50 text-accent">
                          NEW
                        </Badge>
                        <span>Digital Media & AI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-accent/50 text-accent">
                          NEW
                        </Badge>
                        <span>Global Cultures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-accent/50 text-accent">
                          NEW
                        </Badge>
                        <span>Philosophy & Ethics</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}>
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
              Testimonials
            </Badge>
            <h2 className="titlefont text-4xl mb-4 text-primary">
              What Our Community Says
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our members about their experiences with Eclectics
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-none shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full"></div>
                  <CardContent className="pt-6 relative stylized-quote">
                    <p className="italic text-muted-foreground mb-4">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us Call to Action */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}>
          <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
            Join Us
          </Badge>
          <h2 className="titlefont text-4xl mb-4 text-primary">
            Join The Eclectics Community
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-muted-foreground">
            Be part of our vibrant community of literature enthusiasts, quiz
            masters, and knowledge seekers.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/80 text-primary">
            <Link href="/join" className="flex items-center gap-2">
              <Sparkles size={20} />
              Become a Member
              <ChevronRight size={16} />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

// Sample testimonial data
const testimonials = [
  {
    quote:
      "Eclectics has transformed my love for literature into a social experience. The quizzes are challenging and the events are always enlightening.",
    name: "Sarah Johnson",
    role: "Book Club Organizer",
  },
  {
    quote:
      "As someone who loves both creating and participating in quizzes, this platform offers the perfect balance. The community is incredibly supportive.",
    name: "Michael Chen",
    role: "Quiz Enthusiast",
  },
  {
    quote:
      "The literary discussions and debates have expanded my horizons. I've discovered so many new authors and genres through Eclectics events.",
    name: "Priya Sharma",
    role: "Literature Student",
  },
];
