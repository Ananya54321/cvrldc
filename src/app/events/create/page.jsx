"use client";
import React, { useState } from "react";
import { postEvent } from "../../../../actions/eventActions";
import {
  Calendar,
  Clock,
  Users,
  Type,
  FileText,
  Link,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    vertical: "",
    eventDate: "",
    link: "",
    location: "",
    eventTime: "",
    organisedBy: "",
  });
  const options = [
    { label: "Eclectics", value: "eclectics" },
    { label: "Writer's space", value: "writers-space" },
    { label: "Shared Shelf", value: "shared-shelf" },
    { label: "Story Telling and Public Speaking (STP)", value: "stp" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event);
    const eventDetails = await postEvent({
      title: event.title.toString().trim(),
      description: event.description.toString().trim(),
      vertical: event.vertical.toString().trim(),
      eventDate: event.eventDate,
      eventTime: event.eventTime.toString().trim(),
      organisedBy: event.organisedBy.toString().trim(),
      location: event.location.toString().trim(),
      link: event.link.toString().trim(),
    });
    console.log("Submitting event details:", eventDetails);

    if (eventDetails.success) {
      toast.success("Event created successfully");
      console.log(eventDetails.message);
      redirect("/events/view");
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
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-secondary rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-4xl font-bold text-accent titlefont text-center mb-6">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Type className="w-4 h-4 mr-2 text-accent" />
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2 text-accent" />
                Description
              </label>
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                placeholder="Describe your event"
                required
              />
            </div>

            {/* Vertical */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2 text-accent" />
                Vertical
              </label>
              <select
                name="vertical"
                value={event.vertical}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                required>
                <option value="">Select Vertical</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-accent" />
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={event.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                required
              />
            </div>

            {/* Event Time */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-accent" />
                Event Time
              </label>
              <input
                type="time"
                name="eventTime"
                value={event.eventTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                required
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 mr-2 text-accent" />
                Registration Link
              </label>
              <input
                type="url"
                name="link"
                value={event.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                placeholder="Enter registration link"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                placeholder="Enter event location"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-2 text-accent" />
                Organized By
              </label>
              <input
                type="text"
                name="organisedBy"
                value={event.organisedBy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent rounded-lg  "
                placeholder="Enter organizer name"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-slate-500 focus:outline-none  focus:ring-orange-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
