"use client";
import React, { useState, useEffect } from "react";
import { getEvents } from "../../../actions/eventActions";

function ViewEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-5xl mx-auto text-secondary">
        <h1 className="text-3xl md:text-5xl font-bold titlefont text-center text-primary my-12">
          📅 Upcoming Events
        </h1>
        <div className="space-y-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-ternary shadow-md rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-accent">
                  {event.title}
                </h2>
                <p className="text-white mt-2">{event.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <p>
                    <strong className="text-secondary">📌 Category:</strong>{" "}
                    {event.vertical}
                  </p>

                  <p>
                    <strong className="text-secondary">
                      📅 Date(DD/MM/YYYY):
                    </strong>
                    {new Date(event.eventDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </p>

                  <p>
                    <strong className="text-secondary">⏰ Time:</strong>{" "}
                    {event.eventTime}
                  </p>
                  <p>
                    <strong className="text-secondary">📍 Location:</strong>{" "}
                    {event.location}
                  </p>
                  <p className="col-span-2">
                    <strong className="text-secondary">👤 Organized By:</strong>{" "}
                    {event.organisedBy}
                  </p>
                </div>

                {event.link && (
                  <div className="mt-4">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-accent text-white px-4 py-2 rounded-lg hover:bg-[#FFA500] transition duration-300">
                      🔗 Visit Event
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No upcoming events available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;
