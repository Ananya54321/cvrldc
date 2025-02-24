import React from "react";
import { upcomingEvents } from "@/constants/data.js";

const UpcomingEvents = () => {
  return (
    <div className="bg-secondary text-primary py-16 px-8" id="events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl titlefont mb-16 text-center">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-on-scroll flex flex-col justify-between bg-ternary rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all"
              id={`event-${event.id}`}>
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
                <button className="w-full bg-accent text-primary py-2 rounded-lg hover:bg-[#e5a970] transition-all font-medium">
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
  );
};

export default UpcomingEvents;
