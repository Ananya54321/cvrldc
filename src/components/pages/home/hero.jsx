import React from "react";
import Image from "next/image";
import homebg from "@/../public/homebg.jpg";

const Hero = () => {
  return (
    <div className="py-10 pt-20 md:p-24 lg:p-48 flex items-center justify-center relative overflow-hidden">
      <Image
        src={homebg}
        alt="homebg"
        objectFit="cover"
        layout="fill"
        quality={100}
        className="absolute inset-0 bg-cover bg-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
      <div className="z-10 text-primary  text-center px-4 fade-up max-w-max mx-auto">
        <h1 className="text-4xl md:text-5xl  lg:text-7xl font-bold mb-8 titlefont ">
          Literary and Debate Club
        </h1>
        <p className="text-lg md:text-xl lg:text-3xl text-cream max-w-5xl mx-auto mb-12  leading-relaxed">
          Where words come alive and ideas take flight. Join us in our pursuit
          of literary excellence and intellectual discourse.
        </p>
      </div>
    </div>
  );
};

export default Hero;
