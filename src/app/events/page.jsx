"use client";
import React, { useState, useEffect } from "react";
import { getEvents, editStatus } from "../../../actions/eventActions";
import { verifyUser } from "../../../actions/userActions";

function ViewEvent() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [loading, setLoading] = useState({}); // Track loading per event

  // Function to check user authentication
  const setAuthStatus = async () => {
    if (typeof window !== "undefined") {
      const jwttoken = localStorage.getItem("token");
      const res = await verifyUser(jwttoken);
      if (res.success) {
        setIsLoggedIn(true);
        setUser(JSON.parse(res.user));
        setToken(jwttoken);
      } else {
        setIsLoggedIn(false);
      }
    }
  };

  const refreshEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    setAuthStatus();
    refreshEvents();
  }, []);

  const handleStatusChange = (eventId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [eventId]: value,
    }));
  };

  // Handle Status Update
  const handleEdit = async (eventId) => {
    try {
      const givenStatus = selectedStatuses[eventId];
      if (!givenStatus) {
        alert("Please select a status before updating.");
        return;
      }

      setLoading((prev) => ({ ...prev, [eventId]: true }));

      const response = await editStatus(eventId, givenStatus);

      if (response.success) {
        alert(`Status updated to: ${givenStatus}`);
        refreshEvents();
      } else {
        alert("Failed to update status. Please try again.");
      }

      console.log("Status Updated:", { eventId, givenStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-5xl mx-auto text-secondary">
        <h1 className="text-3xl md:text-5xl font-bold titlefont text-center text-primary my-12">
          📅 Upcoming Events
        </h1>
        <div className="space-y-6">
          {loading && events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-ternary shadow-md rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-accent flex items-center">
                  {event.title}{" "}
                  {event.isCompleted ? (
                    <span className="ml-2 text-xs text-secondary px-2 py-1 rounded-full bg-green-900/70 opacity-80">
                      Completed
                    </span>
                  ) : event.isCancelled ? (
                    <span className="ml-2 text-xs text-secondary px-2 py-1 rounded-full bg-yellow-800/70 opacity-80">
                      Cancelled
                    </span>
                  ) : null}
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
                    </strong>{" "}
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

                <div className="mt-6 p-2 md:p-3 bg-gray-800 bg-opacity-30 rounded-lg flex flex-wrap items-center gap-3">
                  <label className="text-white font-bold">Change Status:</label>
                  <select
                    value={selectedStatuses[event._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(event._id, e.target.value)
                    }
                    className="p-2 border text-sm rounded-md bg-gray-700 text-white">
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => handleEdit(event._id)}
                    className={`px-4 py-2 rounded-md transition ml-auto ${
                      loading[event._id]
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-accent text-white hover:bg-[#FFA500]"
                    }`}
                    disabled={loading[event._id]}>
                    {loading[event._id] ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-primary">
              Searching for upcoming events.. Please Hold On
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;
