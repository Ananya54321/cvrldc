"use client";
import React, { useState, useEffect } from "react";
import {
  announcements,
  benefits,
  upcomingEvents,
  achievements,
  testimonials,
} from "../constants/data.js";
import { CircleUserRound } from "lucide-react";
import Hero from "@/components/pages/home/hero.jsx";

const Page = () => {
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Hero />

      {/* Announcements Section */}
      <div className="bg-primary text-accent py-20 px-8" id="announcements">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl titlefont mb-12 text-center">
            Latest Announcements
          </h2>

          <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`absolute inset-0 transition-all duration-700 transform p-8 py-28 rounded-xl flex flex-col justify-between ${
                  index === activeAnnouncement
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  backgroundColor: announcement.important
                    ? "#BF8B41"
                    : "#464936",
                }}>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-bold">{announcement.title}</h3>
                    <span className="text-white/80 text-lg">
                      {announcement.date}
                    </span>
                  </div>
                  <p className="text-xl text-white/90">
                    {announcement.content}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  {announcement.important && (
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      Important
                    </span>
                  )}
                  <button className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/90 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveAnnouncement(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeAnnouncement
                    ? "bg-accent w-6"
                    : "bg-accent/40"
                }`}
                aria-label={`Announcement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-secondary text-primary py-16 px-8" id="events">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl titlefont mb-16 text-center">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-on-scroll bg-ternary rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all"
                id={`event-${event.id}`}
                style={{
                  opacity: isVisible[`event-${event.id}`] ? 1 : 0,
                  transform: isVisible[`event-${event.id}`]
                    ? "translateY(0)"
                    : "translateY(50px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${index * 0.15}s`,
                }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                      {event.date}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-accent">
                    {event.title}
                  </h3>
                  <div className="flex items-center mb-4 text-white/80">
                    <span className="mr-4 bg-primary/20 text-center rounded-lg p-1 text-sm">
                      {event.time}
                    </span>
                    <span className="bg-primary/20 text-center rounded-lg p-1 px-2 text-sm">
                      {event.location}
                    </span>
                  </div>
                  <p className="text-white/90 mb-6">{event.description}</p>
                  <button className="w-full bg-accent text-primary py-2 rounded-lg hover:bg-accent/80 transition-all font-medium">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="border-2 bg-primary border-[#e5a970] text-secondary hover:bg-primary/80 px-8 py-3 rounded-lg text-xl transition-all">
              View All Events
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-ternary text-secondary py-16 px-8" id="achievements">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl titlefont mb-16 text-center text-accent">
            Achievements of the Club Members
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="animate-on-scroll bg-primary/50 p-6 rounded-xl transition-all hover:shadow-xl"
                id={`achievement-${achievement.id}`}
                style={{
                  opacity: isVisible[`achievement-${achievement.id}`] ? 1 : 0,
                  transform: isVisible[`achievement-${achievement.id}`]
                    ? "translateX(0)"
                    : index % 2 === 0
                    ? "translateX(-50px)"
                    : "translateX(50px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${index * 0.1}s`,
                }}>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="mb-4 md:mb-0 md:mr-6 md:border-r border-accent/30 pr-6">
                    <h3 className="text-2xl font-bold text-accent">
                      {achievement.name}
                    </h3>
                    <p className="text-white/80">{achievement.year}</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium mb-3 text-secondary">
                      {achievement.achievement}
                    </p>
                    <blockquote className="italic text-white/80">
                      "{achievement.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary/30 p-8 rounded-xl">
            <h3 className="text-3xl text-center mb-8 text-accent">
              What Our Members Say
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="text-center">
                  {/* <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-accent">
                  </div> */}
                  <div className="flex justify-center items-center">
                    <CircleUserRound size={64} />
                  </div>
                  <p className="italic text-white/90 mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="font-bold text-accent">{testimonial.name}</p>
                  <p className="text-white/70 text-sm">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Join LDC Section */}
      <div className="bg-primary text-secondary py-16 px-8" id="benefits">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl titlefont mb-16 text-center">
            Why Join LDC?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="animate-on-scroll bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:translate-y-[-5px] group"
                id={`benefit-${benefit.id}`}
                style={{
                  opacity: isVisible[`benefit-${benefit.id}`] ? 1 : 0,
                  transform: isVisible[`benefit-${benefit.id}`]
                    ? "translateY(0)"
                    : "translateY(50px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${benefit.id * 0.1}s`,
                }}>
                <div className="mb-4 text-accent text-5xl flex justify-center">
                  {benefit.icon === "brain" && "🧠"}
                  {benefit.icon === "mic" && "🎤"}
                  {benefit.icon === "users" && "👥"}
                  {benefit.icon === "trophy" && "🏆"}
                  {benefit.icon === "star" && "⭐"}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-center text-lg text-primary/80">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <blockquote className="italic text-2xl max-w-4xl mx-auto text-primary/80 border-l-4 border-accent pl-6 py-2">
              "Debate is about the clash of ideas, not people. It is through
              this clash that we refine our thinking and discover truth."
            </blockquote>
            <p className="mt-4 text-lg text-primary/70">
              — Dr. Elizabeth Thornton, Club Advisor
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-secondary text-primary py-16 px-8" id="contact">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl titlefont mb-16 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              className="animate-on-scroll"
              id="contact-info"
              style={{
                opacity: isVisible["contact-info"] ? 1 : 0,
                transform: isVisible["contact-info"]
                  ? "translateX(0)"
                  : "translateX(-50px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
              <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-medium">Email</p>
                  <a
                    href="mailto:ldc.cvr@gmail.com"
                    className="text-accent hover:underline text-lg">
                    ldc.cvr@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xl font-medium">Weekly Meetings</p>
                  <p className="text-lg">Every Friday, 4:00 PM - 6:00 PM</p>
                  <p className="text-lg">Literature Department, Room 305</p>
                </div>
                <div>
                  <p className="text-xl font-medium">Faculty Advisor</p>
                  <p className="text-lg">Dr. Elizabeth Thornton</p>
                  <a
                    href="mailto:e.thornton@college.edu"
                    className="text-accent hover:underline text-lg">
                    e.thornton@college.edu
                  </a>
                </div>
                <div className="pt-4">
                  <p className="text-xl font-medium mb-3">Follow Us</p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-4xl hover:text-accent transition-colors">
                      📷
                    </a>
                    <a
                      href="#"
                      className="text-4xl hover:text-accent transition-colors">
                      📱
                    </a>
                    <a
                      href="#"
                      className="text-4xl hover:text-accent transition-colors">
                      🐦
                    </a>
                    <a
                      href="#"
                      className="text-4xl hover:text-accent transition-colors">
                      📺
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="animate-on-scroll"
              id="contact-form"
              style={{
                opacity: isVisible["contact-form"] ? 1 : 0,
                transform: isVisible["contact-form"]
                  ? "translateX(0)"
                  : "translateX(50px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
              <h3 className="text-3xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Type your message here..."></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg text-xl transition-all w-full md:w-auto">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-secondary py-8 px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <img
            src="/api/placeholder/120/40"
            alt="LDC Logo"
            className="mx-auto mb-6"
          />
          <p className="mb-4">
            © 2025 Literary and Debate Club. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-secondary/70">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
