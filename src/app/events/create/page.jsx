"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { verifyUser } from "../../../../actions/userActions";

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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const setAuthStatus = () => {
    if (typeof window !== "undefined") {
      const jwttoken = localStorage.getItem("token");
      verifyUser(jwttoken).then((res) => {
        if (res.success) {
          setIsLoggedIn(true);
          setUser(JSON.parse(res.user));
          console.log("User logged in");
          setToken(jwttoken);
        } else {
          setIsLoggedIn(false);
          router.push("/login");
          console.log("User not logged in");
        }
      });
    }
  };

  useEffect(() => {
    setAuthStatus();
  }, []);

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Log in to create or edit a blog");
      router.push("/login");
      return;
    }
    console.log(event);
    const eventDetails = await postEvent(
      {
        title: event.title.toString().trim(),
        description: event.description.toString().trim(),
        vertical: event.vertical.toString().trim(),
        eventDate: event.eventDate,
        eventTime: event.eventTime.toString().trim(),
        organisedBy: event.organisedBy.toString().trim(),
        location: event.location.toString().trim(),
        link: event.link.toString().trim(),
      },
      token
    );
    console.log("Submitting event details:", eventDetails);

    if (eventDetails.success) {
      toast.success("Event created successfully");
      console.log(eventDetails.message);
      router.push("/events/view");
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
    <div className=" py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <h2 className=" text-3xl md:text-5xl md:py-4 font-bold text-accent titlefont text-center mb-6">
        Create New Event
      </h2>
      <div className=" m-auto px-8 py-6 bg-secondary md:w-[70%] rounded-xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
          <div className="flex flex-col md:flex-row md:gap-24 ">
            {/* Left side 1st half */}
            <div className="flex flex-col gap-2 md:gap-4 md:w-[50%]">
              {/* Event Title */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
            </div>
            {/* Right side - 2nd half */}
            <div className="flex flex-col gap-2 md:gap-4 md:w-[50%]">
              {/* Event Time */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                <label className="flex items-center text-sm font-medium text-gray-700 md:mb-2 ">
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
                className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform focus:outline-none  focus:ring-orange-500 focus:ring-offset-2  md:w-[50%] duration-200 mt-4 md:ml-1 md:mt-6 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
