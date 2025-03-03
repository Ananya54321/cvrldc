"use client";
import React, { useState, useEffect } from "react";
import { getEventsWithFilter } from "../../../../actions/eventActions";

function FilteredEvents({ vertical }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const pics = [
    { vertical: "stp", link: "/stp.jpeg" },
    { vertical: "shared-shelf", link: "/shared.jpg" },
    { vertical: "eclectics", link: "/quiz.jpeg" },
    { vertical: "writers-space", link: "/writers.jpg" },
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getEventsWithFilter(vertical);
        setEvents(response);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [vertical]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-secondary">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="bg-secondary rounded-3xl text-primary py-16 px-8"
      id="events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl titlefont mb-16 text-center">
          {vertical ? `Our Latest Events` : "Filtered Events"}
        </h2>

        <div className="flex flex-col gap-8 items-center">
          {events.length > 0 ? (
            events.map((event, index) => {
              const eventPicture = pics.find(
                (pic) => pic.vertical === event.vertical
              );
              const imageSrc = eventPicture
                ? eventPicture.link
                : "/default-event.jpg";

              return (
                <div
                  key={index}
                  className="flex w-[70%] bg-ternary rounded-xl shadow-lg overflow-hidden">
                  <div className="w-1/3 h-60">
                    <img
                      src={imageSrc}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-2/3 p-6 flex flex-col justify-between">
                    <h3 className="text-2xl font-bold text-accent mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-white/80 mb-2">
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
                    <p className="text-white/90 mb-4">{event.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="bg-primary/20 text-center rounded-lg p-1 px-2 text-sm text-white/80">
                        {event.organisedBy}
                      </span>

                      {event.link ? (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent text-primary py-1 px-4 rounded-lg hover:bg-[#e5a970] transition-all font-medium">
                          Visit Event
                        </a>
                      ) : (
                        <button className="bg-accent text-primary py-1 px-4 rounded-lg hover:bg-[#e5a970] transition-all font-medium">
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-ternary rounded-xl w-[70%]">
              <p className="text-xl text-white/90">
                No upcoming events available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilteredEvents;
