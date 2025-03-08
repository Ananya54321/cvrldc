import React from "react";
import facts from "../constants/randomfacts.js";

const loading = () => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  return (
    <div className=" flex flex-col p-5 md:w-[80%]  items-center justify-center text-accent bg-primary">
      <p className="text-sm md:text-lg">
        Here is a random fact for you while the page loads:
      </p>
      <h1 className="text-secondary text-base text-center md:text-2xl">
        {randomFact}
      </h1>
    </div>
  );
};

export default loading;
