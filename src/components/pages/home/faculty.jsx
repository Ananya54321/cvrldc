import React from "react";
import Image from "next/image";

const Faculty = () => {
  const facultyMembers = [
    {
      name: "Dr. Jaya Verma",
      title: "Faculty Coordinator",
      image: "/faculty1.png",
    },
    {
      name: "Dr. Hymavathi",
      title: "Faculty Coordinator",
      image: "/faculty2.png", // Direct path from public folder
    },
  ];

  return (
    <div className="w-full bg-ternary mx-auto py-12 px-4">
      <h2 className="titlefont text-4xl text-center mb-12 text-accent">
        Faculty Coordinators
      </h2>

      <div className="grid md:grid-cols-2 gap-8 md:gap-4 justify-items-center">
        {facultyMembers.map((faculty, index) => (
          <div
            key={index}
            className="rounded-lg p-6 hover-lift w-full max-w-sm text-center">
            <div className="mb-4 relative mx-auto">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-accent">
                <Image
                  src={faculty.image}
                  alt={faculty.name}
                  width={128} // Set explicit width
                  height={128} // Set explicit height
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-secondary">
              {faculty.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
