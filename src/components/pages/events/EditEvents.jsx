"use client";
import React, { useState } from "react";
import { updateEventDetails } from "@/../actions/eventActions";
import {
  Calendar,
  Clock,
  Users,
  Type,
  FileText,
  Link,
  MapPin,
} from "lucide-react";

function EditEvents({ vertical }) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    link: "",
    location: "",
    eventTime: "",
    organisedBy: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event);
    const eventDetails = await updateEventDetails(
      vertical.trim(),
      event.title.trim(),
      event
    );
    console.log("Submitting event details:", eventDetails);

    if (eventDetails.success) {
      console.log(eventDetails.message);
      if (event.link) {
        window.open(event.link, "_blank");
      }
    } else {
      console.log(eventDetails.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    console.log(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Type className="w-4 h-4 mr-2 text-indigo-500" />
                Event Title (Enter the same title as that during creation)
              </label>
              <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                Description
              </label>
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Describe your event"
                required
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={event.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Event Time */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                Event Time
              </label>
              <input
                type="time"
                name="eventTime"
                value={event.eventTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 mr-2 text-indigo-500" />
                Registration Link
              </label>
              <input
                type="url"
                name="link"
                value={event.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Enter registration link"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Enter event location"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2 text-indigo-500" />
                Organized By
              </label>
              <input
                type="text"
                name="organisedBy"
                value={event.organisedBy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Enter organizer name"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Confirm Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEvents;
