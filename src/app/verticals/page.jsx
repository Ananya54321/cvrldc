"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const VerticalsPage = () => {
  // Animation for cards on page load
  useEffect(() => {
    const cards = document.querySelectorAll(".vertical-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-up");
      }, index * 150);
    });
  }, []);

  return (
    <div className="bg-secondary  pt-12 px-4 sm:px-6 lg:px-8">
      {/* Wave divider at the top */}

      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="titlefont text-5xl md:text-7xl text-primary mb-4">
          <span className="text-highlight">Creative Verticals</span>
        </h1>
        <p className=" text-xl text-ternary">
          Discover your community and unleash your potential
        </p>
      </div>

      {/* Verticals grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eclectics */}
        <div className="vertical-card opacity-0 hover-lift rounded-lg overflow-hidden bg-white shadow-md border-l-4 border-accent">
          <div className="p-6 relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent rounded-full opacity-20"></div>
            <h2 className="bangers text-3xl mb-3 text-primary">Eclectics</h2>
            <p className=" text-ternary mb-4">
              A space for the curious minds who enjoy diverse topics and
              creative exploration.
            </p>
            <Link
              href="/eclectics"
              className="inline-block bg-accent text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 custom-focus">
              View Eclectics
            </Link>
          </div>
        </div>

        {/* Writer's Space */}
        <div className="vertical-card opacity-0 hover-lift rounded-lg overflow-hidden bg-white shadow-md border-l-4 border-primary">
          <div className="p-6 relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary rounded-full opacity-20"></div>
            <h2 className="bangers text-3xl mb-3 text-primary">
              Writer's Space
            </h2>
            <p className=" text-ternary mb-4">
              A haven for wordsmiths to craft stories, share ideas, and hone
              their literary skills.
            </p>
            <Link
              href="/writers-space"
              className="inline-block bg-primary text-secondary px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 custom-focus">
              View Writer's Space
            </Link>
          </div>
        </div>

        {/* Story Telling and Public Speaking */}
        <div className="vertical-card opacity-0 hover-lift rounded-lg overflow-hidden bg-white shadow-md border-l-4 border-ternary">
          <div className="p-6 relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-ternary rounded-full opacity-20"></div>
            <h2 className="bangers text-3xl mb-3 text-primary">
              Story Telling & Public Speaking
            </h2>
            <p className=" text-ternary mb-4">
              Master the art of captivating audiences through powerful
              narratives and confident delivery.
            </p>
            <Link
              href="/stp"
              className="inline-block bg-ternary text-secondary px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 custom-focus">
              View STP
            </Link>
          </div>
        </div>

        {/* Shared Shelf */}
        <div className="vertical-card opacity-0 hover-lift rounded-lg overflow-hidden bg-white shadow-md border-l-4 border-accent">
          <div className="p-6 relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent rounded-full opacity-20"></div>
            <h2 className="bangers text-3xl mb-3 text-primary">Shared Shelf</h2>
            <p className=" text-ternary mb-4">
              A community of book lovers exchanging recommendations, insights,
              and literary discussions.
            </p>
            <Link
              href="/shared-shelf"
              className="inline-block bg-accent text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 custom-focus">
              View Shared Shelf
            </Link>
          </div>
        </div>
      </div>

      {/* Wave divider at the bottom */}
      <div className="wave-divider mt-16 transform rotate-180"></div>
    </div>
  );
};

export default VerticalsPage;
