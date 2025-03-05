import React from "react";
import { announcements } from "@/constants/data.js";

const Announcements = () => {
  return (
    <div className="bg-primary text-accent py-20 px-8" id="announcements">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl titlefont mb-12 text-center">
          Latest Announcements
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              style={{
                backgroundColor: announcement.important ? "#BF8B41" : "#464936",
              }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{announcement.title}</h3>
                <span className="text-white/80 text-sm ml-4">
                  {announcement.date}
                </span>
              </div>

              <p className="text-lg text-white/90 mb-6">
                {announcement.content}
              </p>

              <div className="flex justify-between items-center">
                {announcement.important && (
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
                    Important
                  </span>
                )}
                <button className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/90 transition-all ml-auto">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
