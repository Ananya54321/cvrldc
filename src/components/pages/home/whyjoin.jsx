import React from "react";
import { benefits } from "@/constants/data";
import { Brain, Mic, Users, Trophy, Star } from "lucide-react";

const iconMap = {
  brain: <Brain size={48} className="text-accent" />,
  mic: <Mic size={48} className="text-accent" />,
  users: <Users size={48} className="text-accent" />,
  trophy: <Trophy size={48} className="text-accent" />,
  star: <Star size={48} className="text-accent" />,
};

const WhyJoin = () => {
  return (
    <section className="bg-primary text-secondary py-20 px-6" id="benefits">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl titlefont font-bold mb-12 tracking-wide">
          Why Join <span className="text-accent">LDC?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group bg-secondary/10 backdrop-blur-md p-8 rounded-2xl shadow-md border border-secondary/30 hover:shadow-lg transition-all hover:scale-[1.05]">
              <div className="mb-6 flex justify-center">
                {iconMap[benefit.icon]}
              </div>
              <h3 className="text-2xl font-semibold text-accent mb-3">
                {benefit.title}
              </h3>
              <p className="text-lg leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <blockquote className="text-2xl italic max-w-3xl mx-auto border-l-4 border-accent pl-6 py-4">
            "Debate is about the clash of ideas, not people. It is through this
            clash that we refine our thinking and discover truth."
          </blockquote>
          <p className="mt-4 text-lg">— Dr. Elizabeth Thornton, Club Advisor</p>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
