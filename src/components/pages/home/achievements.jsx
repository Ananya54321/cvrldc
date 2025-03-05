import React from "react";
import { CircleUserRound } from "lucide-react";
import { achievements, testimonials } from "@/constants/data.js";
const Achievements = () => {
  return (
    <div className="bg-ternary text-secondary py-16 px-8" id="achievements">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl titlefont mb-16 text-center text-accent">
          Achievements of the Club Members
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="animate-on-scroll bg-primary/50 p-6 rounded-xl transition-all hover:shadow-xl"
              id={`achievement-${achievement.id}`}>
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-6 md:border-r border-accent/30 pr-6">
                  <h3 className="text-2xl font-bold text-accent">
                    {achievement.name}
                  </h3>
                  <p className="text-white/80">{achievement.year}</p>
                </div>
                <div>
                  <p className="text-xl font-medium mb-3 text-secondary">
                    {achievement.achievement}
                  </p>
                  <blockquote className="italic text-white/80">
                    "{achievement.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
