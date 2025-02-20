"use client";
import React, { useState, useEffect } from "react";
import { announcements } from "@/constants/data.js";

const Announcements = () => {
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
  }, []);
  return (
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
                backgroundColor: announcement.important ? "#BF8B41" : "#464936",
              }}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-bold">{announcement.title}</h3>
                  <span className="text-white/80 text-lg">
                    {announcement.date}
                  </span>
                </div>
                <p className="text-xl text-white/90">{announcement.content}</p>
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
                index === activeAnnouncement ? "bg-accent w-6" : "bg-accent/40"
              }`}
              aria-label={`Announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
