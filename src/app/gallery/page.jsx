"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { format } from "date-fns";
import UploadPage from "@/components/pages/gallery/UploadImages";
import { createGallery, getGalleries } from "@/../actions/galleryActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Define Modal Root Element for Accessibility
// This should be set to a valid element that exists in your application
// Modify this appropriately based on your app's structure

const VERTICAL_TYPES = {
  SHARED_SHELF: "shared shelf",
  STP: "STP",
  ECLETICS: "eclectics",
  WRITER_SPACE: "writer space",
  LDC: "LDC",
};

const Page = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    vertical: VERTICAL_TYPES.SHARED_SHELF,
    date: format(new Date(), "yyyy-MM-dd"),
    images: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // In Next.js with app router, this is more appropriate
      Modal.setAppElement("body");
    }
  }, []);

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

  const displayedEvents = showAll ? events : events.slice(0, 5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure images are properly included before submission
    if (!newEvent.title.trim() || newEvent.images.length === 0) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }

    try {
      const res = await createGallery(newEvent);
      console.log("Created gallery response:", res);

      if (res?.success && res?.gallery) {
        setEvents((prev) => [...prev, res.gallery]);
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

  // Generate card items for the carousel from event images
  const generateCarouselItems = (event) => {
    if (!event.images || event.images.length === 0) return [];

    return event.images.map((image, idx) => (
      <Card
        key={`${event.id}-${idx}`}
        card={{
          category: `${event.vertical} · ${format(
            new Date(event.date),
            "MMMM dd, yyyy"
          )}`,
          title: event.title,
          src: image,
          content: (
            <div className="space-y-4">
              <img
                src={image}
                alt={`${event.title} - image ${idx + 1}`}
                className="w-full h-auto rounded-lg"
              />
              <div className="flex justify-between items-center">
                <p className="text-lg text-gray-700">
                  {`Image ${idx + 1} of ${event.images.length}`}
                </p>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {event.vertical}
                </span>
              </div>
            </div>
          ),
        }}
        index={idx}
        layout={true}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-PRIMARY">
      <div className="max-w-7xl mx-auto px-4 py-12 text-gray-900">
        <header className="text-white py-12 md:pb-24 text-center mb-12 rounded-3xl">
          <h1 className="text-4xl md:text-7xl titlefont text-accent mb-3">
            Gallery
          </h1>
          <p className="text-secondary text-lg">
            Capturing moments, preserving memories, and celebrating the
            literature, one at a time.
          </p>
        </header>

        <div className="flex justify-end items-center mb-12">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            className="bg-ternary opacity-90 text-white px-4 py-4 md:p-5 hover:scale-105 transition-transform text-lg font-medium shadow-lg">
            Add Event
          </Button>
        </div>

        <motion.div className="space-y-24">
          <AnimatePresence>
            {displayedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="overflow-hidden">
                <div className=" px-8">
                  <h3 className="text-xl md:text-3xl text-accent">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-secondary text-base">
                      {format(new Date(event.date), "MMMM dd, yyyy")}
                    </p>
                    <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                      {event.vertical}
                    </span>
                  </div>
                </div>

                {event.images && event.images.length > 0 && (
                  <div className="w-full">
                    <Carousel items={generateCarouselItems(event)} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {events.length > 5 && !showAll && (
          <div className="text-center mt-16">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="text-amber-800 hover:text-amber-900 border-amber-800 hover:border-amber-900 font-medium text-lg">
              View All Events
            </Button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="max-w-xl mx-auto mt-5 bg-white w-[90%] md:w-[50%] rounded-3xl p-4 md:p-6 shadow-2xl"
          overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          ariaHideApp={false} // Add this line to prevent the error temporarily
        >
          <h2 className="text-2xl text-accent text-amber-800">Add New Event</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-700 text-base">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 text-base">Vertical</label>
              <select
                value={newEvent.vertical}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, vertical: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all">
                {Object.values(VERTICAL_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-700 text-base">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full border-2 border-amber-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="text-gray-700">Images</label>
              <p className="text-sm mb-3 text-gray-500">
                Upload up to 10 images for this event
              </p>
              <UploadPage
                existingImages={newEvent.images}
                onUpload={(uploadedImages, isReset) => {
                  if (isReset) {
                    // This is called when images are removed
                    setNewEvent((prev) => ({
                      ...prev,
                      images: uploadedImages,
                    }));
                  } else {
                    // This is for adding new images
                    setNewEvent((prev) => {
                      // Prevent more than 10 images
                      const combinedImages = [...prev.images, ...uploadedImages]
                        .filter(
                          (url, index, self) => self.indexOf(url) === index
                        ) // Remove duplicates
                        .slice(0, 10); // Limit to 10 images

                      return {
                        ...prev,
                        images: combinedImages,
                      };
                    });
                  }
                }}
              />
              {newEvent.images.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  {newEvent.images.length} image
                  {newEvent.images.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-ternary text-white px-6 py-4 text-base font-medium shadow-lg hover:scale-105 transition-transform">
              Add Event
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
