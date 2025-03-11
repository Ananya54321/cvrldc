"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { format } from "date-fns";
import UploadPage from "@/components/pages/gallery/UploadImages";
import { createGallery, getGalleries } from "../../../actions/galleryActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Define Modal Root Element for Accessibility

const VERTICAL_TYPES = {
  SHARED_SHELF: "shared shelf",
  STP: "STP",
  ECLETICS: "eclectics",
  WRITER_SPACE: "writer space",
  LDC: "LDC",
};
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 500; // Width of each card
  const gap = 24; // Gap between cards
  const totalWidth = itemWidth + gap;

  useEffect(() => {
    if (!images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= images.length) {
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2rem]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex gap-6 p-8"
          animate={{
            x: -currentIndex * totalWidth,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            width: `${images.length * totalWidth}px`,
          }}>
          {images.map((image, idx) => (
            <motion.div
              key={`${idx}`}
              className="relative w-[500px] h-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_48px_100px_0_rgba(17,12,46,0.15)] transform-gpu group"
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}>
              <motion.img
                src={image}
                alt="Event"
                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.05 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
const Page = () => {
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    vertical: VERTICAL_TYPES.SHARED_SHELF,
    date: format(new Date(), "yyyy-MM-dd"),
    images: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getGalleries();
        console.log("Fetched galleries:", res);

        if (res?.galleries) {
          // Convert _id to a string
          const formattedGalleries = res.galleries.map((event) => ({
            ...event,
            id: event._id.toString(), // Ensure _id is a string
          }));

          setEvents(formattedGalleries);
        } else {
          console.error("No galleries found or invalid response format.");
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    };
    fetchEvents();
  }, []);

  const displayedEvents = showAll
    ? Object.values(events)
    : Object.values(events).slice(0, 5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure images are properly included before submission
    if (!newEvent.title.trim() || newEvent.images.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    try {
      console.log("images", newEvent.images);
      const res = await createGallery(newEvent); // Send newEvent with images
      console.log("Created gallery response:", res);

      if (res?.success && res?.gallery) {
        setEvents((prev) => ({ ...prev, [res.gallery.id]: res.gallery }));
        setIsModalOpen(false);
        toast.success("Gallery created successfully");
        setNewEvent({
          title: "",
          vertical: VERTICAL_TYPES.SHARED_SHELF,
          date: format(new Date(), "yyyy-MM-dd"),
          images: [], // Clear images only after submission
        });
      } else {
        console.error("Failed to create gallery:", res);
        toast.error("Failed to create gallery");
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      toast.error("Failed to create gallery");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-PRIMARY">
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-900">
        <header className=" text-white py-12 md:pb-24 text-center mb-12 rounded-3xl ">
          <h1 className="text-3xl md:text-7xl titlefont text-accent mb-3">
            Gallery
          </h1>
          <p className="text-secondary text-lg">
            Capturing moments, preserving memories, and celebrating the
            literature, one at a time.
          </p>
        </header>

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-medium text-accent">Recent Events</h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            className="bg-ternary opacity-90 text-white px-4 py-4 md:p-5 hover:scale-105  transition-transform text-lg font-medium shadow-lg">
            Add Event
          </Button>
        </div>

        <motion.div className="space-y-16">
          <AnimatePresence>
            {displayedEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="overflow-hidden">
                <ImageCarousel images={event.images} />
                <div className="mt-8 px-8">
                  <h3 className="text-3xl text-accent mb-4">{event.title}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-secondary text-lg">
                      {format(new Date(event.date), "MMMM dd, yyyy")}
                    </p>
                    <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                      {event.vertical}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {Object.keys(events).length > 5 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="text-amber-800 hover:text-amber-900 font-medium text-lg underline-offset-4 hover:underline">
              View All Events
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="max-w-xl mx-auto mt-20 bg-white w-[90%] md:w-[50%] rounded-3xl p-10 shadow-2xl"
          overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <h2 className="text-3xl text-accent text-amber-800 mb-8">
            Add New Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 text-lg">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-lg">
                Vertical
              </label>
              <select
                value={newEvent.vertical}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, vertical: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all">
                {Object.values(VERTICAL_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-lg">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Images</label>
              <UploadPage
                onUpload={(uploadedImages) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    images: [...(prev.images || []), ...uploadedImages],
                  }))
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-ternary text-white px-6 py-4  text-lg font-medium mt-8 shadow-lg hover:scale-105 transition-transform">
              Add Event
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
