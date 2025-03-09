"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { format } from "date-fns";
import UploadPage from "@/components/pages/gallery/UploadImages";
import { createGallery, getGalleries } from "../../../actions/galleryActions";
import { toast } from "sonner";

// Define Modal Root Element for Accessibility

const VERTICAL_TYPES = {
  SHARED_SHELF: "shared shelf",
  STP: "STP",
  ECLETICS: "eclectics",
  WRITER_SPACE: "writer space",
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!images?.length) return null;

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Event"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
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
    <div className="min-h-screen bg-amber-50 ">
      <div className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
        <header className="bg-amber-800 text-white py-8 text-center mb-6">
          <h1 className="text-4xl font-serif">Literary and Debate Club</h1>
          <p className="mt-2 text-amber-100">
            Where words come alive and ideas take flight
          </p>
        </header>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif text-amber-800">Recent Events</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors">
            Add Event
          </button>
        </div>

        <motion.div className="space-y-6">
          <AnimatePresence>
            {displayedEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden">
                <ImageCarousel images={event.images} />
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-amber-800 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {format(new Date(event.date), "MMMM dd, yyyy")}
                  </p>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {event.vertical}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {Object.keys(events).length > 5 && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="text-amber-800 hover:text-amber-900 font-medium">
              View All Events
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          className="max-w-lg mx-auto mt-20 bg-white rounded-lg p-6"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-2xl font-serif text-amber-800 mb-6">
            Add New Event
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Vertical</label>
              <select
                value={newEvent.vertical}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, vertical: e.target.value })
                }
                className="w-full border rounded px-3 py-2">
                {Object.values(VERTICAL_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
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

            <button
              type="submit"
              className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors">
              Add Event
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
