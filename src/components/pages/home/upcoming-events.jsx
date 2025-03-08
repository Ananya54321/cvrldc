"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "../../../../actions/eventActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UpcomingEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

  const pics = [
    {
      vertical: "stp",
      link: "/stp.jpeg",
    },
    {
      vertical: "shared-shelf",
      link: "/shared.jpeg",
    },
    {
      vertical: "eclectics",
      link: "/quiz.jpeg",
    },
    {
      vertical: "writers-space",
      link: "/writers.jpg",
    },
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const goToEvents = () => {
    setNavigating(true);
    setTimeout(() => {
      router.push("/events");
    }, 500);
  };

  if (loading || navigating) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-secondary text-primary py-16 px-8" id="events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl titlefont mb-16 text-center">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const eventPicture = pics.find(
              (pic) => pic.vertical === event.vertical
            );
            const imageSrc = eventPicture ? eventPicture.link : event.image;

            return (
              <div
                key={index}
                className="animate-on-scroll bg-ternary rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all"
                id={`event-${index}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                      {new Date(event.eventDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-accent">
                    {event.title}
                  </h3>
                  <div className="flex items-center mb-4 text-white/80">
                    <span className="mr-4 bg-primary/20 text-center rounded-lg p-1 text-sm">
                      {new Date(
                        `1970-01-01T${event.eventTime}`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <span className="bg-primary/20 text-center rounded-lg p-1 px-2 text-sm">
                      {event.location}
                    </span>
                  </div>
                  <p className="text-white/90 mb-6">{event.description}</p>
                  <a
                    href={`${event.link}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="w-full bg-accent text-primary py-2 rounded-lg hover:bg-[#e5a970] transition-all font-medium">
                      Register Now
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            className="border-2 bg-primary border-[#e5a970] text-secondary hover:bg-primary/80 px-8 py-3 rounded-lg text-xl transition-all"
            onClick={goToEvents}>
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
